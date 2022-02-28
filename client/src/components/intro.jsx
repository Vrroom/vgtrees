import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Emoji from "./emoji";

class Intro extends Component {
  componentDidMount() {
    const { setHighlight } = this.props;
    setHighlight(true);
  }

  componentWillUnmount() {
    const { setHighlight } = this.props;
    setHighlight(false);
  }

  render() {
    return (
      <Row className="py-3 align-items-center">
        <Col className="d-flex justify-content-center">
          <ListGroup variant="flush">
            <ListGroup.Item className="py-4">
              <h4>Hi! I'm Sumit and I'm studying visual perception</h4>
            </ListGroup.Item>
            <ListGroup.Item className="py-4">
              <h4>I'll show you images and you will group related objects</h4>
            </ListGroup.Item>
            <ListGroup.Item className="py-4">
              <h4>By observing you, I'll gain insights into how we group</h4>
            </ListGroup.Item>
            <ListGroup.Item className="py-4">
              <h4>
                Thank you for participating <Emoji>😇</Emoji>
              </h4>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default Intro;
