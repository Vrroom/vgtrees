/**
 * @file GraphicDisplay class implementation.
 *
 * @author Sumit Chaturvedi
 */
import React, { Component } from "react";
import addStopPropagation from "../utils/eventModifier";
import { selectColor, highlightColor, rgb2string } from "../utils/palette";
import { isStyleNotNone } from "../utils/svg";
import { node2ReactElement } from "../utils/reacthelpers";
import { isUndef } from "../utils/misc";
import alphaBlink from "../utils/math";

function validHighlight(hl) {
  return !isUndef(hl) && hl.length > 0;
}

function coverElement(path, key, props, t) {
  const { graph, selected, hover, highlight } = props;
  const selectedId = selected.map((i) => graph.nodes[i].paths).flat();
  if (
    !validHighlight(highlight) &&
    !selectedId.includes(key) &&
    !hover.includes(key)
  ) {
    return null;
  }
  const { onClick } = props;
  let color = "none";
  if (validHighlight(highlight) && highlight.includes(key)) {
    color = rgb2string(highlightColor, alphaBlink(t));
  } else if (selectedId.includes(key)) {
    color = rgb2string(selectColor, 1);
  } else if (hover.includes(key)) {
    color = rgb2string(selectColor, 0.6);
  }
  const fill = isStyleNotNone("fill", path.properties) ? color : "none";
  const stroke = isStyleNotNone("stroke", path.properties) ? color : "none";
  return React.createElement(path.tagName, {
    ...path.properties,
    id: "cover-element",
    fill,
    stroke,
    onClick: addStopPropagation((evt) => onClick(evt, key)),
  });
}

function pathElement(path, key, events) {
  const { onClick, onPointerOver, onPointerLeave } = events;
  return React.createElement(path.tagName, {
    ...path.properties,
    id: `path-${key}`,
    onClick: addStopPropagation((evt) => onClick(evt, key)),
    onPointerOver: addStopPropagation(() => onPointerOver(key)),
    onPointerLeave: addStopPropagation(() => onPointerLeave(key)),
  });
}

class GraphicDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
    };
    if (validHighlight(props.highlight)) {
      this.counter = setInterval(this.increment, 40);
    }
  }

  increment = () => {
    this.setState((prevState) => {
      const { x } = prevState;
      return { x: x + 1 };
    });
  };

  componentDidUpdate(prevProps) {
    const { highlight } = this.props;
    if (!validHighlight(prevProps.highlight) && validHighlight(highlight)) {
      this.counter = setInterval(this.increment, 40);
    } else if (
      validHighlight(prevProps.highlight) &&
      !validHighlight(highlight)
    ) {
      clearInterval(this.counter, 40);
    }
  }

  componentWillUnmount () {
    clearInterval(this.counter);
  }

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
          {pathElement(path, key, this.props)}
          {coverElement(path, key, this.props, this.state.x)}
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
