import React from "react"; 
import Form from "react-bootstrap/Form"; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 

function Likert (props) { 
  const { qnum, children } = props;
  return (
    <>
      <Row className="justify-content-center">
        <Col>
          <h4>{children}</h4>
        </Col> 
      </Row>
      <Row className="py-2 justify-content-center"> 
        <Col className="d-flex justify-content-center"> 
          <Form>
            <Form.Check
              inline
              label="Strongly Disagree"
              name={`likert-${qnum}`}
              type="radio"
              id="1"
            />
            <Form.Check
              inline
              label="Disagree"
              name={`likert-${qnum}`}
              type="radio"
              id="2"
            />
            <Form.Check
              inline
              label="Neutral"
              name={`likert-${qnum}`}
              type="radio"
              id="3"
            />
            <Form.Check
              inline
              label="Agree"
              name={`likert-${qnum}`}
              type="radio"
              id="4"
            />
            <Form.Check
              inline
              label="Strongly Agree"
              name={`likert-${qnum}`}
              type="radio"
              id="5"
            />
          </Form>
        </Col>
      </Row> 
    </>
  ); 
}

export default Likert;
