import React from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function HelpModal(props) {
  const { show, onHide } = props;
  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable animation>
      <Modal.Header>
        <Modal.Title>
          <Container className="px-5">
            <Row>
              <Col md="auto">Help</Col>
            </Row>
          </Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="p-3">
            <Col className="col-8">
              <ListGroup variant="flush">
                <ListGroup.Item className="p-2">
                  <p className="lead">Group related objects</p>
                </ListGroup.Item>
                <ListGroup.Item className="p-2">
                  <p className="lead">Click on objects to select</p>
                </ListGroup.Item>
                <ListGroup.Item className="p-2">
                  <p className="lead">
                    Clear selection by tapping anywhere on screen
                  </p>
                </ListGroup.Item>
                <ListGroup.Item className="p-2">
                  <p className="lead">
                    Click on the group icon to create a group
                  </p>
                </ListGroup.Item>
                <ListGroup.Item className="p-2">
                  <p className="lead">
                    Undo a node by double-clicking on the bubble
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default HelpModal;
