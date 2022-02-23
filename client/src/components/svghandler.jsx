/**
 * @file SVGHandler class implementation.
 *
 * @author Sumit Chaturvedi
 */
import React, { Component } from "react";
import addStopPropagation from "../utils/eventModifier";
import { selectColor, rgb2string } from "../utils/palette";
import { coveringBBox, isStyleNotNone } from "../utils/svg";
import { node2ReactElement } from "../utils/reacthelpers";
import { isUndef } from "../utils/misc";
import alphaBlink from "../utils/math"; 

function validHighlight (hl) {
  return !isUndef(hl) && hl.length > 0;
}

function coverElement (path, key, props, t) {
  const { graph, selected, hover, highlight } = props; 
  const selectedId = selected.map((i) => graph.nodes[i].paths).flat();
  if (!validHighlight(highlight) && !selected.includes(key) && !hover.includes(key)) {
    return null;
  }
  const { onClick } = props; 
  let color = "none";
  if (validHighlight(highlight) && highlight.includes(key)) {
    color = rgb2string(selectColor, alphaBlink(t));
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
    onClick: addStopPropagation(evt => onClick(evt, key))
  });
}

function pathElement (path, key, events) {
  const { onClick, onPointerOver, onPointerLeave } = events; 
  return React.createElement(path.tagName, {
    ...path.properties, 
    id: `path-${key}`,
    onClick: addStopPropagation((evt) => onClick(evt, key)),
    onPointerOver: addStopPropagation(() => onPointerOver(key)),
    onPointerLeave: addStopPropagation(() => onPointerLeave(key)),
  }); 
}

class SVGHandler extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      x: 0, 
    }; 
    if (validHighlight(props.highlight)) {
      setInterval(this.increment, 40);
    }
  }

  increment = () => {
    this.setState((prevState) => {
      const { x } = prevState;
      return { x: x + 1 };
    }); 
  }

  componentDidUpdate (prevProps) {
    const { highlight } = this.props;
    if (!validHighlight(prevProps.highlight) && validHighlight(highlight)) {
      this.counter = setInterval(this.increment, 40);
    } else if (validHighlight(prevProps.highlight) && !validHighlight(highlight)) {
      clearInterval(this.increment, 40);
    }
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

  coveringBBoxOfAListOfPaths = (pathList) => {
    const { bboxes } = this.props.graphic;
    return coveringBBox(pathList.map(id => bboxes[id]));
  }

  /* Create React Elements for bounding boxes of selected paths.
   *
   * Set their event listeners and style attributes.
   *
   * @returns {Component}   A group component with the bounding boxes.
   */
  boundingBoxGroupElement = () => {
    const { graph, selected } = this.props;
    const { onClick, onPointerOver, onPointerLeave } = this.props;
    const boundingBoxes = selected.map(id => this.coveringBBoxOfAListOfPaths(graph.nodes[id].paths));
    const reactBoxes = boundingBoxes.map((bbox, i) => {
      // Use percentage for strokeWidth so that it remains invariant to the SVG document's dimensions.
      //
      // Also, pointerEvents is set to "stroke" so that the pointer events (such as click) 
      // are fired only when we click on the boundary of the rectangles.
      const id = selected[i];
      const properties = {
        stroke: rgb2string(selectColor, 1),
        strokeWidth: "2%",
        pointerEvents: "stroke",
        onClick: addStopPropagation((evt) => onClick(evt, id)),
        onPointerOver: addStopPropagation(() => onPointerOver(id)),
        onPointerLeave: addStopPropagation(() => onPointerLeave(id))
      };
      const key = `bbox-${id}`;
      // It is possible that the path is an horizontal
      // or a vertical line. In this case, the rectangle
      // won't render properly.
      //
      // Check whether the rectangle has area. If so,
      // create a rectangle bounding box. Else, simply
      // create a line to denote the bounding box.
      if (bbox.height > 0 && bbox.width > 0) {
        return (
          <rect
            key={key}
            x={bbox.x}
            y={bbox.y}
            width={bbox.width}
            height={bbox.height}
            fill="transparent"
            {...properties}
          />
        );
      } else {
        const x1 = bbox.x;
        const y1 = bbox.y;
        let x2, y2;
        if (bbox.width === 0) {
          x2 = bbox.x;
          y2 = bbox.y + bbox.height;
        } else {
          x2 = bbox.x + bbox.width;
          y2 = bbox.y;
        }
        return (
          <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} {...properties} />
        );
      }
    });
    return (
      <g key="bbox-group" id="bbox-group">
        {reactBoxes}
      </g>
    );
  };


  render() {
    const { svg } = this.props.graphic;
    const children = this.graphicElements();
    // children.push(this.boundingBoxGroupElement());
    return React.createElement(
      svg.tagName,
      { ...svg.properties, id: "svg-element" },
      children
    );
  }
}

export default SVGHandler;
