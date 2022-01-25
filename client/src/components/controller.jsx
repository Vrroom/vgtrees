import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import SVGHandler from "./svghandler";
import GraphHandler from "./graphhandler";
import Buttons from "./buttons";
import { preprocessSVG } from "../utils/svg";
import { boxforce } from "../utils/boxforce";
import { cloneDeep } from "lodash";
import {
  createEmptyGraph,
  isRoot,
  findRoot
} from "../utils/graph";
import { nodeColors } from "../utils/palette";
import * as d3 from "d3";

class Controller extends Component {
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
      filename: '',
    };
    // d3-force's simulation object for calculating 
    // the graph layout and because it looks cool.
    this.sim = d3.forceSimulation();
  }

  setGraphState = graph => {
    this.setState({ graph: graph });
  };

  componentDidMount() { this.getNewSVGFromDB(); }

  setStateWithNewSVG = (svgString, filename) => {
    const graphic = preprocessSVG(svgString);
    const graph = createEmptyGraph(graphic);
    this.setState({
      graphic,
      graph: graph,
      hover: [],
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
    fetch("/task")
      .then(res => res.json())
      .then(item => {
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
      node => typeof node.parent === "undefined"
    );
    this.sim
      .alpha(alpha)
      .restart()
      .nodes(rootNodes)
      .force(
        "collide",
        d3.forceCollide().radius(node => (node.radius + 1) * node.visible)
      )
      .force(
        "charge",
        d3.forceManyBody().strength(node => -5 * node.visible)
      )
      .force(
        "boxforce",
        boxforce(node => node.radius, width, height)
      )
      .force("forceX", d3.forceX(width / 2).strength(0.1))
      .force("forceY", d3.forceY(height / 2).strength(0.1))
      .on("tick", () => {
        this.setGraphState(copy, false);
      });
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
  handlePointerOver = id => {
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
      const hover = node.children.map(i => graph.nodes[i].paths).flat();
      this.setState({ hover });
    }
  };

  /*
   * Reset state when pointer leaves some node.
   *
   * @param   {Number}  id - Id of the node.
   */
  handlePointerLeave = id => {
    const graph = this.state.graph;
    id = findRoot(id, graph);
    let node = graph.nodes[id];
    node.fill = nodeColors.group;
    this.setState({ hover: [] });
  };

  handleAcceptClick = event => {
    fetch("/accept", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        filename: this.state.filename,
        status: 'accept'
      })
    })
    this.getNewSVGFromDB();
  }

  handleRejectClick = event => {
    fetch("/accept", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        filename: this.state.filename,
        status: 'reject'
      })
    })
    this.getNewSVGFromDB();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <SVGHandler
              graphic={this.state.graphic}
              graph={this.state.graph}
              selected={this.state.selected}
              hover={this.state.hover}
              onPointerOver={this.handlePointerOver}
              onPointerLeave={this.handlePointerLeave}
            />
          </Col>
          <Col>
            <GraphHandler
              graphic={this.state.graphic}
              docId={this.state.id}
              graph={this.state.graph}
              onPointerOver={this.handlePointerOver}
              onPointerLeave={this.handlePointerLeave}
            />
          </Col>
        </Row>
        <Buttons
          clickAccept={this.handleAcceptClick}
          clickReject={this.handleRejectClick}
        ></Buttons>
      </Container>
    );
  }
}

export default Controller;
