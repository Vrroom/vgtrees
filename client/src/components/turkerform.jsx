import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

class TurkerForm extends Component {
  constructor(props) {
    super(props);
    this.captchaRef = React.createRef();
  }

  onChange = () => {
    const { onCaptchaChange } = this.props;
    const value = this.captchaRef.current.getValue();
    onCaptchaChange(value);
  };

  render() {
    const { validated } = this.props;
    return (
      <Container className="px-5">
        <Form noValidate id="turker-form" validated={validated} method="post">
          <Row className="g-5">
            <Form.Group as={Col} md="6" controlId="validationCustomEmail">
              <Form.Label>Email address</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustomMturk">
              <Form.Label>MTurk ID</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="turkid"
                  placeholder="Enter MTurk ID"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your MTurk ID
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Col md="6">
              <ReCAPTCHA
                sitekey="6LezYj4eAAAAAJt66Vn8WMEOBv6hLVEwGTRcrfYy"
                ref={this.captchaRef}
                onChange={this.onChange}
              />
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default TurkerForm;
