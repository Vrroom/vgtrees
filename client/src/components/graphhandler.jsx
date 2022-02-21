/*
 * @file GraphHandler class implementation.
 *
 * @author Sumit Chaturvedi
 */
import React, { Component } from "react";
import { coveringBBox, boxCenter } from "../utils/svg";
import { selectColor } from "../utils/palette";
import addStopPropagation from "../utils/eventModifier";

/*
 * Controls how the graph is being displayed to the
 * user based on their interactions.
 *
 * The graph is essentially a tree. Based on user
 * interactions, new nodes and links are added.
 *
 * These new nodes represent groups and the links
 * represent parent-child relations.
 *
 * Links can be deleted by double clicking on them.
 *
 * Nodes can be drag and dropped. For example, dragging
 * and dropping a single path node on a group node will
 * add the single path to the group.
 *
 * Paths or groups can also be selected by clicking on
 * nodes.
 *
 * @extends Component
 */
class GraphHandler extends Component {
  /*
   * Create React Elements for a subset of paths of the SVG.
   *
   * When a collection of paths are grouped, a new node is 
   * created for that grouping.
   *
   * The collection of paths is embedded in the node giving the 
   * user visual feedback on their grouping.
   *
   * @param   {Array}   pathIds - Indices of paths for this node.
   * @param   {Number}  nodeId - Index of node for the path subset.
   *
   * @returns {Array}   List of React Elements for the paths in the
   * subset.
   */
  subsetSVG = (pathIds, nodeId) => {
    const { paths } = this.props.graphic;
    pathIds.sort((x, y) => x - y);
    const pathSubset = pathIds.map(i => paths[i]);
    return pathSubset.map((ps, psId) => {
      return React.createElement(ps.tagName, {
        ...ps.properties,
        key: `path-${nodeId}-${psId}`
      });
    });
  };

  /*
   * Find the node transformation.
   *
   * The node transformation depends on the
   * area occupied by the paths in it, it's radius
   * and it's x and y position.
   *
   * This function is used for calculating
   * transformations while displaying the
   * nodes in the graph as well as the
   * suggestion nodes.
   *
   * @param   {Array}   paths - List of path indices.
   * @param   {Number}  radius - Node radius.
   *
   * @return  {Object}  The scale and x, y translation.
   */
  nodeTransformation = (paths, radius, x, y) => {
    const { bboxes } = this.props.graphic;
    const box = coveringBBox(paths.map(i => bboxes[i]));
    const scale = Math.min(1, radius / Math.max(box.width, box.height));
    let { cx, cy } = boxCenter(box);
    cx *= scale;
    cy *= scale;
    const tx = x - cx;
    const ty = y - cy;
    return { scale, tx, ty };
  };

  /*
   * Helper function for getVertices to convert graph
   * nodes into SVG Group Elements.
   *
   * Each node in the graph is represented by the
   * subset of paths within it. These paths need to
   * be displayed within these nodes.
   *
   * This function determines the size of the nodes and
   * calculates the transformation for the path subset
   * so that it can be displayed within the nodes.
   *
   * @param   {Object}  node - Contains the id of the node,
   * it's radius, it's x and y coordinates, it's radius and fill.
   *
   * @returns {Component} SVG Group Element.
   */
  node2Group = node => {
    const {
      selected,
      onClick,
      onPointerOver,
      onPointerLeave,
      onNodeDblClick
    } = this.props;
    const stroke = selected.includes(node.id) ? selectColor : "none";
    const { scale, tx, ty } = this.nodeTransformation(
      node.paths,
      node.radius,
      node.x,
      node.y
    );
    return (
      <g
        key={`vertex-${node.id}`}
        onClick={addStopPropagation((evt) => onClick(evt, node.id))}
        onPointerOver={addStopPropagation(() => onPointerOver(node.id))}
        onPointerLeave={addStopPropagation(() => onPointerLeave(node.id))}
        onDoubleClick={addStopPropagation((evt) => onNodeDblClick(evt, node.id))}
        opacity={node.visible}
        pointerEvents={node.visible === 1 ? "auto" : "none"}
      >
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={node.radius}
          fill={node.fill}
          stroke={stroke}
          strokeWidth="2"
        />
        <g
          key={`path-group-${node.id}`}
          transform={`translate(${tx} ${ty}) scale(${scale})`}
        >
          {this.subsetSVG(node.paths, node.id)}
        </g>
      </g>
    );
  };

  /*
   * Create array of SVG Group Elements for graph nodes.
   *
   * @returns {Array}   An array of SVG Group Elements for
   * graph node.
   */
  getVertices = () => {
    const { graph } = this.props;
    if (graph.nodes.length === 0) {
      return <path />;
    }
    // Filter out all nodes which are children of some node.
    let nodes = graph.nodes.filter(node => typeof node.parent === "undefined");
    const groups = nodes.map(this.node2Group);
    return groups;
  };

  render() {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        id="svg-graph-element"
      >
        {this.getVertices()}
      </svg>
    );
  }
}

export default GraphHandler;

