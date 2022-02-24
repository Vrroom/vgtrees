import React from "react";
import Form from "react-bootstrap/Form"; 
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Comments (props) {
  return (
    <>
      <Row className="py-3 align-content-center"> 
        <Col className="d-flex justify-content-center">
          <Form>
            <Form.Group className="mb-3" controlId="comments">
              <Form.Label><h4>Share your experience!</h4></Form.Label>
              <Form.Control as="textarea" rows={4} />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Comments;

