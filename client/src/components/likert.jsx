import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Likert extends Component {
  getRating = () => {
    const { qnum } = this.props;
    const opt = [1, 2, 3, 4, 5].filter((option) => {
      const radio = document.getElementById(`likert-${qnum}-${option}`);
      return radio.checked;
    });
    if (opt.length > 0) {
      return opt[0];
    } else {
      return "none";
    }
  };

  render() {
    const { qnum, children } = this.props;
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
                id={`likert-${qnum}-1`}
              />
              <Form.Check
                inline
                label="Disagree"
                name={`likert-${qnum}`}
                type="radio"
                id={`likert-${qnum}-2`}
              />
              <Form.Check
                inline
                label="Neutral"
                name={`likert-${qnum}`}
                type="radio"
                id={`likert-${qnum}-3`}
              />
              <Form.Check
                inline
                label="Agree"
                name={`likert-${qnum}`}
                type="radio"
                id={`likert-${qnum}-4`}
              />
              <Form.Check
                inline
                label="Strongly Agree"
                name={`likert-${qnum}`}
                type="radio"
                id={`likert-${qnum}-5`}
              />
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

export default Likert;
