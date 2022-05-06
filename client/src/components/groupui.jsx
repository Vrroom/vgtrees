import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner"; 
import GraphicDisplay from "./graphicdisplay";
import GroupDisplay from "./groupdisplay";
import { preprocessSVG } from "../utils/svg";
import { boxforce } from "../utils/boxforce";
import { cloneDeep } from "lodash";
import {
  createEmptyGraph,
  isRoot,
  findRoot,
  updateVisualProperties,
  groupNodes,
  isTree,
} from "../utils/graph";
import { nodeColors } from "../utils/palette";
import * as d3 from "d3";
import { ReactComponent as Group } from "../icons/group.svg";
import { ReactComponent as Undo } from "../icons/undo.svg"; 
import IconButton from "./iconbutton";
import { isUndef } from "../utils/misc";
import { postData } from "../utils/post";

function skipClear(props) {
  const { disableClear } = props;
  return !isUndef(disableClear) && disableClear;
}

function skipUndo (props) {
  const { disableUndo } = props;
  return !isUndef(disableUndo) && disableUndo;
}

function skipGroup(props) {
  const { disableGroup } = props;
  return !isUndef(disableGroup) && disableGroup;
}

function skipNode(props, graph, nid) {
  const { disableNodes } = props;
  const paths = graph.nodes[nid].paths;
  return !isUndef(disableNodes) && paths.every(i => disableNodes.includes(i));
}

const HISTORY_LEN = 10;

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
      history: [], 
      hover: [],
      selected: [],
      filename: "",
      svgString: '<svg height="100" width="100"></svg>',
      nothingIn: true
    };
    // d3-force's simulation object for calculating
    // the graph layout and because it looks cool.
    this.sim = d3.forceSimulation();
  }

  resetToInit = () => {
    const { svgString, filename } = this.state;
    this.setStateWithNewSVG(svgString, filename);
  };

  setGraphState = (graph) => {
    this.setState({ graph });
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
    if (!isUndef(this.props.setHighlight)) {
      const { setHighlight, setShowNext } = this.props;
      setHighlight(false); 
      setShowNext(false); 
    }
    this.sim.stop();
    window.removeEventListener("click", this.handleClear);
  }

  setStateWithNewSVG = (svgString, filename, groups) => {
    const graphic = preprocessSVG(svgString);
    let graph = createEmptyGraph(graphic);
    if (isUndef(groups)) groups = [];
    for (let i = 0; i < groups.length; i += 1) {
      graph = groupNodes(graph, groups[i]);
    }
    graph = updateVisualProperties(graph, graphic);
    this.setState({
      graphic,
      graph: graph,
      hover: [],
      selected: [],
      filename,
      svgString,
      nothingIn: false
    });
    this.updateSimulation(graph);
    this.tryNotifyParent({ type: "new-svg", graph });
  };

  /*
   * Fetch an SVG string from server.
   * Update the state of the component
   * with this SVG string and id.
   */
  getNewSVGFromDB = () => {
    const { src, metadata } = this.props;
    postData(src, metadata).then((item) => {
      const { svg, filename, groups } = item;
      this.setStateWithNewSVG(svg, filename, groups);
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
   *    Once this is done, React will update the GroupDisplay
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

  tryNotifyParent = (msg) => {
    const { notifyParent } = this.props;
    if (!isUndef(notifyParent)) {
      notifyParent(msg);
    }
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
    if (skipNode(this.props, graph, id)) return;
    id = findRoot(id, graph);
    const isSelected = selected.includes(id);
    // Toggle on the basis of whether the node was already selected or not.
    if (isSelected) {
      selected.splice(selected.indexOf(id), 1);
    } else {
      selected.push(id);
    }
    this.setState({ selected });
    this.tryNotifyParent({ type: "select", selected });
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
    const graph = this.state.graph;
    id = findRoot(id, graph);
    let node = graph.nodes[id];
    node.fill = nodeColors.group;
    this.setState({ hover: [] });
  };

  handleUndoClick = (event) => {
    if (skipUndo(this.props)) return;
    this.setState((prevState) => {
      const { history } = prevState; 
      const graph = history.pop(); 
      this.updateSimulation(graph); 
      return { history, graph };
    }); 
    this.tryNotifyParent({ type: "undo" });
  }

  /*
   * Handle click on the group button.
   *
   * Check whether the selected nodes are
   * mergeable. Create a new node representing
   * the merge if this is the case.
   */
  handleGroupClick = (event) => {
    if (skipGroup(this.props)) return;
    const selected = [...this.state.selected];
    // Add this new graph to the history and 
    // forget stuff if history is too long.
    const oldGraph = cloneDeep(this.state.graph); 
    const paths = selected.map(i => oldGraph.nodes[i].paths).flat();
    this.setState((prevState) => {
      const { history } = prevState; 
      if (history.length >= HISTORY_LEN) {
        history.splice(0, 1); 
      }
      history.push(oldGraph); 
      return { history }; 
    }); 
    const graph = updateVisualProperties(
      groupNodes(oldGraph, selected),
      this.state.graphic
    );
    if (isTree(graph)) {
      postData(this.props.target, {
        ...this.state,
        graph,
        ...this.props.metadata,
      }).then((res) => this.tryNotifyParent({ type: "tree-check", ...res }));
      if (!isUndef(this.props.setHighlight)) {
        const { setHighlight, setShowNext } = this.props;
        setHighlight(true); 
        setShowNext(true);
      }
    }
    this.updateSimulation(graph);
    this.tryNotifyParent({ type: "group", selected, paths });
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
    if (skipClear(this.props)) return;
    const selected = [];
    this.setState({ selected });
    this.tryNotifyParent({ type: "clear" });
  };

  render() {
    let { highlightSvg, highlightGroup, highlightGraph, highlightUndo } = this.props;
    if (this.state.nothingIn) {
      return (
        <Row className="py-3 align-items-center">
          <Col className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      );
    }
    if (isUndef(highlightSvg)) highlightSvg = [];
    if (isUndef(highlightGraph)) highlightGraph = [];
    if (isUndef(highlightGroup)) highlightGroup = false;
    if (isUndef(highlightUndo)) highlightUndo = false;
    return (
      <>
        <Row>
          <Col className="d-flex justify-content-center">
            <GraphicDisplay
              graphic={this.state.graphic}
              graph={this.state.graph}
              selected={this.state.selected}
              hover={this.state.hover}
              onClick={this.handleClick}
              onPointerOver={this.handlePointerOver}
              onPointerLeave={this.handlePointerLeave}
              highlight={highlightSvg}
            />
          </Col>
          <Col className="d-flex justify-content-center">
            <GroupDisplay
              graphic={this.state.graphic}
              docId={this.state.id}
              graph={this.state.graph}
              selected={this.state.selected}
              onClick={this.handleClick}
              onPointerOver={this.handlePointerOver}
              onPointerLeave={this.handlePointerLeave}
              highlight={highlightGraph}
            />
          </Col>
          <Col className="col-1 d-flex align-items-center">
            <IconButton
              name="Undo"
              active={this.state.history.length > 0}
              onClick={this.handleUndoClick}
              highlight={highlightUndo}
            >
              <Undo />
            </IconButton>
          </Col>
        </Row>
        <Row>
          <Col>
            <IconButton
              name="Group"
              active={true}
              onClick={this.handleGroupClick}
              highlight={highlightGroup}
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
