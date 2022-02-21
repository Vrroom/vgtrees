import React, { Component } from "react";
import IconButton from "./iconbutton";
import SlideNav from "./slidenav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ReactComponent as ContactUs } from "../icons/contact.svg";

class SlideGroup extends Component {

  constructor (props) {
    super(props);
    this.state = { slideId: 0 };
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
  }

  onNext = () => {
    const nSlides = this.props.children.length;
    this.setState((prevState) => {
      const { slideId } = prevState;
      return { slideId: Math.min(nSlides - 1, slideId + 1) }; 
    });
  }

  handleKey = (e) => {
    if (e.key === "ArrowRight") {
      this.onNext();
    } else if (e.key === "ArrowLeft") {
      this.onPrev();
    }
  };

  sendEmail = () => {
    window.open(
      "mailto:sumit.chaturvedi@gmail.com?subject=VGTrees Annotation App"
    );
  };

  render() {
    const { titles, children } = this.props;
    const { slideId } = this.state;
    return (
      <Container id="app-container" className="p-3">
        <Row className="justify-content-center">
          <Col className="text-center"> <h1>Sumit</h1> </Col>
        </Row>
        <Row className="slide-content"> 
        {children[slideId]}
        </Row> 
        <Row className="mt-auto"> 
          <SlideNav 
            onPrev={this.onPrev}
            onNext={this.onNext}
            nSlides={children.length}
            slideId={slideId}
          />
          <Row className="p-3"> 
            <Col> 
              <IconButton
                name="Contact Us"
                active={true}
                onClick={this.sendEmail}
              >
                <ContactUs />
              </IconButton>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

export default SlideGroup;
