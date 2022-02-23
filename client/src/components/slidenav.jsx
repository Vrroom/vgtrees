import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar"
import IconButton from "./iconbutton";
import { ReactComponent as LeftArrow } from "../icons/leftarrow.svg";
import { ReactComponent as RightArrow } from "../icons/rightarrow.svg";

class SlideNav extends Component {

  render() {
    const { nSlides, slideId, onPrev, onNext, highlightPrev, highlightNext } = this.props; 
    const pct = (100 * (slideId + 1) / nSlides);
    return (
      <Row className="py-3 justify-content-center"> 
        <Col> 
          <IconButton
            name="Previous"
            active={slideId > 0}
            onClick={onPrev}
            highlight={highlightPrev}
          >
            <LeftArrow />
          </IconButton>
        </Col>
        <Col className="align-self-center"> 
          <ProgressBar variant="success" now={pct} />
        </Col>
        <Col> 
          <IconButton
            name="Next"
            active={slideId + 1 < nSlides}
            onClick={onNext}
            highlight={highlightNext}
          >
            <RightArrow />
          </IconButton>
        </Col>
      </Row>
    );
  }
}

export default SlideNav;
