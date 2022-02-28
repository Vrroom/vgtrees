import React, { Component } from "react";
import SlideNav from "./slidenav";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import PageTransition from "./transition";

class SlideGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { slideId: 0, highlightPrev: false, highlightNext: false };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }

  onPrev = () => {
    this.setState((prevState) => {
      const { slideId } = prevState;
      return { slideId: Math.max(0, slideId - 1) };
    });
  };

  onNext = () => {
    const nSlides = this.props.children.length;
    this.setState((prevState) => {
      const { slideId } = prevState;
      return { slideId: Math.min(nSlides - 1, slideId + 1) };
    });
  };

  handleKey = (e) => {
    if (e.key === "ArrowRight") {
      this.onNext();
    } else if (e.key === "ArrowLeft") {
      this.onPrev();
    }
  };

  setHighlight = (val) => {
    this.setState({ highlightNext: val });
  };

  render() {
    const { children } = this.props;
    const { slideId, highlightPrev, highlightNext } = this.state;
    return (
      <Container id="app-container" className="">
        <Row className="slide-content">
          <PageTransition
            page={slideId}
            children={children}
            setHighlight={this.setHighlight}
          />
        </Row>
        <Row className="border-top mt-3">
          <SlideNav
            onPrev={this.onPrev}
            onNext={this.onNext}
            nSlides={children.length}
            slideId={slideId}
            highlightPrev={highlightPrev}
            highlightNext={highlightNext}
          />
        </Row>
      </Container>
    );
  }
}

export default SlideGroup;
