import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ConsentForm from "./consentform";
import TurkerForm from "./turkerform";
import Transition from "./transition";
import postData from "../utils/post";

class EntryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      allowNext: false,
      validated: false,
      captchaCompleted: false,
      captchaValue: null,
    };
    this.captchaRef = React.createRef();
  }

  onScroll = () => {
    const body = document.getElementById("informed-consent");
    if (body.scrollTop + body.clientHeight >= body.scrollHeight - 10) {
      this.setState((prevState) => {
        const { page } = prevState;
        if (page === 0) {
          return { allowNext: true };
        }
      });
    }
  };

  handleCaptchaChange = (captchaValue) => {
    this.setState({
      captchaCompleted: true,
      allowNext: true,
      captchaValue,
    });
  };

  handleNext = (event) => {
    this.setState((prevState) => {
      const { page, captchaValue } = prevState;
      if (page === 0) {
        return { page: page + 1, allowNext: false };
      } else {
        const form = document.getElementById("turker-form");
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          return { validated: true };
        }
        const [email, turkid] = form.elements;
        const { completeEntry } = this.props;
        postData("/validate", {
          email: email.value,
          turkid: turkid.value,
          captchaValue,
        }).then((res) => completeEntry(res));
        return { validated: true };
      }
    });
  };

  render() {
    const { allowNext, page, validated } = this.state;
    return (
      <Modal show={true} size="lg" centered scrollable animation>
        <Modal.Header>
          <Modal.Title>
            <Container className="px-5">
              <Row>
                <Col md="auto"> Welcome to VGTrees! </Col>
              </Row>
            </Container>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          key="informed-consent"
          id="informed-consent"
          onScroll={this.onScroll}
        >
          <Transition show={page === 0}>
            <ConsentForm />
          </Transition>
          <Transition show={page === 1}>
            <TurkerForm
              validated={validated}
              onCaptchaChange={this.handleCaptchaChange}
            />
          </Transition>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!allowNext} onClick={this.handleNext}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EntryModal;
