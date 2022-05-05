/**
 * @file GraphicDisplay class implementation.
 *
 * @author Sumit Chaturvedi
 */
import React, { Component } from "react";
import { node2ReactElement } from "../utils/reacthelpers";

class GraphicDisplay extends Component {
  /**
   * Create React Elements for SVG paths.
   *
   * @returns {Array}   List of graphic elements as React Elements.
   */
  graphicElements = () => {
    const { paths, defs } = this.props.graphic;
    const elements = paths.map((path, key) => {
      return (
        <g key={`path-group-${key}`}>
          {React.createElement(path.tagName, {
              ...path.properties,
              id: `path-${key}`,
          })}
        </g>
      );
    });
    if (typeof defs !== "undefined") {
      elements.splice(0, 0, node2ReactElement(defs));
    }
    return elements;
  };

  render() {
    const { svg } = this.props.graphic;
    const children = this.graphicElements();
    return React.createElement(
      svg.tagName,
      { ...svg.properties, id: "svg-element" },
      children
    );
  }
}

export default GraphicDisplay;

