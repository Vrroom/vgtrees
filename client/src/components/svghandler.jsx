/**
 * @file SVGHandler class implementation.
 *
 * @author Sumit Chaturvedi
 */
import React, { Component } from "react";
import addStopPropagation from "../utils/eventModifier";
import { node2ReactElement } from "../utils/reacthelpers";

class SVGHandler extends Component {

  /**
   * Create React Elements for SVG paths.
   *
   * Set the fillOpacity and strokeOpacity of paths
   * depending on whether the user is hovering over them.
   *
   * Set event listeners for various mouse events.
   *
   * @returns {Array}   List of graphic elements as React Elements.
   */
  graphicElements = () => {
    const { paths } = this.props.graphic;
    // hover is a list of path indices that are being hovered over.
    const { onPointerOver, onPointerLeave, hover } = this.props;
    return paths.map((path, key) => {
      const { fillOpacity, strokeOpacity } = path.properties;
      const hasHover = key => hover.length > 0 && !hover.includes(key);
      return React.createElement(path.tagName, {
        ...path.properties,
        key,
        id: `path-${key}`,
        fillOpacity: hasHover(key) ? 0.1 : fillOpacity,
        strokeOpacity: hasHover(key) ? 0.1 : strokeOpacity,
        onPointerOver: addStopPropagation(() => onPointerOver(key)),
        onPointerLeave: addStopPropagation(() => onPointerLeave(key))
      });
    });
  };

  /**
   * Render the SVG.
   *
   * @return {Component}
   */
  render() {
    const { svg, defs } = this.props.graphic;
    let children = []
    if (typeof defs !== "undefined") {
      children.push(node2ReactElement(defs));
    }
    children = children.concat(this.graphicElements());
    return React.createElement(
      svg.tagName,
      { ...svg.properties, id: "svg-element" },
      children
    );
  }
}

export default SVGHandler;
