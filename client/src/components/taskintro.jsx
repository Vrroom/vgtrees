import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";

class TaskIntro extends Component {
  componentDidMount() {
    const { setHighlight, setShowNext } = this.props;
    setShowNext(true);
    setHighlight(true);
  }

  componentWillUnmount() {
    const { setHighlight, setShowNext } = this.props;
    setShowNext(false);
    setHighlight(false);
  }

  render() {
    return (
      <Row className="py-3 align-items-center">
        <Col className="d-flex justify-content-center">
          <ListGroup variant="flush">
            <ListGroup.Item className="py-4">
              <h4>Now you have to group 5 images</h4>
            </ListGroup.Item>
            <ListGroup.Item className="py-4">
              <h4>Remember to group only 2-4 objects at a time</h4>
            </ListGroup.Item>
            <ListGroup.Item className="py-4">
              <h4>Consider symmetry and proximity while grouping</h4>
            </ListGroup.Item>
            <ListGroup.Item className="py-4">
              <h4>When grouping is ambiguous, use your best judgment</h4>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default TaskIntro;
