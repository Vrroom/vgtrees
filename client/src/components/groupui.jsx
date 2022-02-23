import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SVGHandler from "./svghandler";
import GraphHandler from "./graphhandler";
import { preprocessSVG } from "../utils/svg";
import { boxforce } from "../utils/boxforce";
import { cloneDeep } from "lodash";
import {
  createEmptyGraph,
  isRoot,
  findRoot,
  updateVisualProperties,
  groupNodes,
} from "../utils/graph";
import { nodeColors } from "../utils/palette";
import * as d3 from "d3";
import { ReactComponent as Group } from "../icons/group.svg";
import IconButton from "./iconbutton";

class GroupUI extends Component {
  /*
   * Set the initial state of the component.
   *
   * This is just a formality because the state
   * would be over-written when the component mounts
   * because there, we can do an AJAX call to retrieve
   * an SVG from the server.
   *
   * Here we use a placeholder SVG string.
   */
  constructor(props) {
    super(props);
    const graphic = preprocessSVG('<svg height="100" width="100"></svg>');
    const graph = createEmptyGraph(graphic, { nodes: {}, links: {} });
    this.state = {
      graphic,
      graph,
      hover: [],
      selected: [],
      filename: "",
    };
    // d3-force's simulation object for calculating
    // the graph layout and because it looks cool.
    this.sim = d3.forceSimulation();
  }

  setGraphState = (graph) => {
    this.setState({ graph: graph });
  };

  /*
   * When the component mounts, add an event listener for
   * click. Any click which isn't caught by a child element
   * of window will be caught here and whatever has been
   * selected by the user would be cleared
   *
   * Also fetch a new graphic from the database.
   */
  componentDidMount() {
    window.addEventListener("click", this.handleClear);
    this.getNewSVGFromDB();
  }

  /*
   * When the component unmounts, remove the click
   * event listener.
   */
  componentWillUnmount() {
    window.removeEventListener("click", this.handleClear);
  }

  setStateWithNewSVG = (svgString, filename) => {
    const graphic = preprocessSVG(svgString);
    const graph = createEmptyGraph(graphic);
    this.setState({
      graphic,
      graph: graph,
      hover: [],
      selected: [],
      filename,
    });
    this.updateSimulation(graph);
  };

  /*
   * Fetch an SVG string from server.
   * Update the state of the component
   * with this SVG string and id.
   */
  getNewSVGFromDB = () => {
    const { src } = this.props;
    fetch(src)
      .then((res) => res.json())
      .then((item) => {
        const { svg, filename } = item;
        this.setStateWithNewSVG(svg, filename);
      });
  };

  /*
   * Update and restart the d3-force simulation.
   *
   * This function is called whenever the graph is
   * changed.
   *
   * 1. The alpha value of simulation is set to 1. This
   *    value slowly decays to 0 as the graph nodes settle
   *    to their final positions.
   * 2. The simulation is restarted with the nodes and the
   *    links set as per the graph.
   * 3. The forces that make the final layout look reasonable
   *    are added.
   * 4. Finally, a callback is registered on the "tick" event.
   *    D3 will internally call this callback on each step
   *    of the simulation. The callback updates the graph state
   *    of the component with the latest value of node positions.
   *    Once this is done, React will update the GraphHandler
   *    component with the new node positions. As a result,
   *    the user will see the nodes move towards their final
   *    layout.
   *
   * @param   {Object}  graph - Graph over SVG paths.
   */
  updateSimulation = (graph, alpha = 1) => {
    const width = 100;
    const height = 100;
    const copy = cloneDeep(graph);
    const rootNodes = copy.nodes.filter(
      (node) => typeof node.parent === "undefined"
    );
    this.sim
      .alpha(alpha)
      .restart()
      .nodes(rootNodes)
      .force(
        "collide",
        d3.forceCollide().radius((node) => (node.radius + 1) * node.visible)
      )
      .force(
        "charge",
        d3.forceManyBody().strength((node) => -5 * node.visible)
      )
      .force(
        "boxforce",
        boxforce((node) => node.radius, width, height)
      )
      .force("forceX", d3.forceX(width / 2).strength(0.1))
      .force("forceY", d3.forceY(height / 2).strength(0.1))
      .on("tick", () => {
        this.setGraphState(copy, false);
      });
  };

  /*
   * Handle Click event on a particular node.
   *
   * Whenever a click event occurs in either the svg handler or
   * the graph handler, this function is called. By clicking on
   * nodes, they either get selected/de-selected according to
   * whether they were de-selected or selected earlier.
   *
   * A node cannot be selected if it's ancestor or descendent is
   * already selected.
   *
   * @param   {Number}  id - Id of the node on which
   * the event was fired.
   */
  handleClick = (event, id) => {
    const selected = cloneDeep(this.state.selected);
    const graph = this.state.graph;
    id = findRoot(id, graph);
    const isSelected = selected.includes(id);
    // Toggle on the basis of whether the node was already selected or not.
    if (isSelected) {
      selected.splice(selected.indexOf(id), 1);
    } else {
      selected.push(id);
    }
    this.setState({ selected });
  };

  /*
   * Handle the event when the pointer hovers over
   * some node.
   *
   * Sets the internal state to mark all the paths
   * who are being hovered over currently. We make such
   * paths more transparent to give user feedback.
   *
   * @param   {Number}  id - Id of the node.
   */
  handlePointerOver = (id) => {
    console.log(id);
    const graph = this.state.graph;
    id = findRoot(id, graph);
    if (!isRoot(id, graph)) {
      this.handlePointerOver(graph.nodes[id].parent);
      return;
    }
    let node = graph.nodes[id];
    node.fill = nodeColors.hover;
    if (node.type === "path") {
      const hover = [id];
      this.setState({ hover });
    } else {
      const hover = node.children.map((i) => graph.nodes[i].paths).flat();
      this.setState({ hover });
    }
  };

  /*
   * Reset state when pointer leaves some node.
   *
   * @param   {Number}  id - Id of the node.
   */
  handlePointerLeave = (id) => {
    console.log('asd', id);
    const graph = this.state.graph;
    id = findRoot(id, graph);
    let node = graph.nodes[id];
    node.fill = nodeColors.group;
    this.setState({ hover: [] });
  };

  /*
   * Burst the bubble and undo the grouping.
   *
   * @param   {Number}  id - Id of the node.
   */
  handleNodeDblClick = (event, id) => {
    this.setState({ selected: [] });
    let graph = cloneDeep(this.state.graph);
    if (graph.nodes[id].type === "path") {
      return;
    }
    let children = graph.nodes[id].children;
    for (let i = 0; i < children.length; i++) {
      const childId = children[i];
      graph.nodes[childId].parent = undefined;
    }
    graph.links = graph.links.filter(
      (link) => !(link.source === id || link.target === id)
    );
    const idMap = {};
    graph.nodes = graph.nodes.filter((node) => node.id !== id);
    graph.nodes.forEach((node, i) => (idMap[node.id] = i));
    for (let i = 0; i < graph.nodes.length; i++) {
      let node = graph.nodes[i];
      node.id = idMap[node.id];
      if (!isRoot(node.id, graph)) node.parent = idMap[node.parent];
      for (let j = 0; j < node.children.length; j++) {
        node.children[j] = idMap[node.children[j]];
      }
    }
    for (let i = 0; i < graph.links.length; i++) {
      let link = graph.links[i];
      link.source = idMap[link.source];
      link.target = idMap[link.target];
    }
    graph = updateVisualProperties(graph, this.state.graphic);
    this.updateSimulation(graph);
  };

  /*
   * Handle click on the group button.
   *
   * Check whether the selected nodes are
   * mergeable. Create a new node representing
   * the merge if this is the case.
   */
  handleGroupClick = (event) => {
    const selected = [...this.state.selected];
    const graph = updateVisualProperties(
      groupNodes(this.state.graph, selected),
      this.state.graphic
    );
    this.updateSimulation(graph);
  };

  /*
   * Clear the selections.
   *
   * Whenever any useless part of the window
   * is clicked, de-select all the selected paths.
   * This is what happens in a lot of graphics
   * editors.
   */
  handleClear = (event) => {
    const selected = [];
    this.setState({ selected });
  };

  render() {
    return (
      <>
        <Row>
          <Col className="d-flex justify-content-center">
            <SVGHandler
              graphic={this.state.graphic}
              graph={this.state.graph}
              selected={this.state.selected}
              hover={this.state.hover}
              onClick={this.handleClick}
              onPointerOver={this.handlePointerOver}
              onPointerLeave={this.handlePointerLeave}
              highlight={[10]}
            />
          </Col>
          <Col className="d-flex justify-content-center">
            <GraphHandler
              graphic={this.state.graphic}
              docId={this.state.id}
              graph={this.state.graph}
              selected={this.state.selected}
              onClick={this.handleClick}
              onPointerOver={this.handlePointerOver}
              onPointerLeave={this.handlePointerLeave}
              onNodeDblClick={this.handleNodeDblClick}
              highlight={[10]}
            />
          </Col>
        </Row>
        <Row> 
          <Col> 
            <IconButton
              name="Group"
              active={true}
              onClick={this.handleGroupClick}
              highlight={true}
            >
              <Group />
            </IconButton>
          </Col>
        </Row>
      </>
    );
  }
}

export default GroupUI;
