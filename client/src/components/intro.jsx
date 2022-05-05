import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Emoji from "./emoji";
import { postCurrentTime } from "../utils/post";

class Intro extends Component {
  componentDidMount() {
    const { setHighlight, setShowNext } = this.props;
    setShowNext(true);
    setHighlight(true);
    postCurrentTime({ start: true });
  }

  componentWillUnmount() {
    const { setHighlight, setShowNext } = this.props;
    setHighlight(false);
    setShowNext(false);
  }

  render() {
    return (
      <Row className="py-3 align-items-center">
        <Col className="d-flex justify-content-center">
          <ListGroup variant="flush">
            <ListGroup.Item className="py-4">
              <h4>
                Thank you for participating <Emoji>😊</Emoji>
              </h4>
            </ListGroup.Item>
            <ListGroup.Item className="py-4">
              <h4>
                I want to understand how people perceive content in images
              </h4>
            </ListGroup.Item>
            <ListGroup.Item className="py-4">
              <h4>
                I'm looking for reliable people to provide this information
              </h4>
            </ListGroup.Item>
            <ListGroup.Item className="py-4">
              <h4>
                You'll learn how to provide this information through a tutorial
              </h4>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default Intro;
