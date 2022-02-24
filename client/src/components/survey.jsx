import React from "react";
import ListGroup from "react-bootstrap/ListGroup"; 
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Likert from "./likert"; 

function Survey (props) {
  return (
    <>
      <Row className="py-3 justify-content-center">
        <Col className="d-flex justify-content-center col-12"><h4>Survey</h4></Col>
      </Row>
      <Row className="py-3 align-items-center"> 
        <Col className="d-flex justify-content-center">
          <ListGroup variant="flush">
            <ListGroup.Item className="py-4"><Likert qnum={0}>I found the tasks easy to complete</Likert></ListGroup.Item>
            <ListGroup.Item className="py-4"><Likert qnum={2}>The instructions were clear</Likert></ListGroup.Item>
            <ListGroup.Item className="py-4"><Likert qnum={1}>I was attentive while completing the task</Likert></ListGroup.Item>
            <ListGroup.Item className="py-4"><Likert qnum={3}>Estimated time for task completion was accurate</Likert></ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default Survey;
