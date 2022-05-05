import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Likert from "./likert";
import IconButton from "./iconbutton";
import PageTransition from "./transition";
import { postData } from "../utils/post";
import { Fireworks } from "fireworks-js/dist/react";

const prompts = [
  "I found the task easy to complete",
  "The instructions were clear",
  "I was attentive while completing the task",
  "Estimated time for task completion (5 min) was accurate",
];

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0 };
    this.promptRefs = prompts.map((p, i) => React.createRef());
  }

  postRatings = () => {
    const { setHighlight, setShowNext } = this.props;
    const ratings = prompts.map((question, i) => {
      return {
        question,
        rating: this.promptRefs[i].current.getRating(),
      };
    });
    postData("/survey", ratings).then(this.setState({ page: 1 }));
    setShowNext(true);
    setHighlight(true);
  };

  componentWillUnmount() {
    const { setHighlight, setShowNext } = this.props;
    setHighlight(false);
    setShowNext(false);
  }

  render() {
    const { page } = this.state;
    return (
      <>
        <Row className="py-2 justify-content-center">
          <Col className="d-flex justify-content-center col-12">
            <h4>Survey</h4>
          </Col>
        </Row>
        <Row className="py-2 align-items-center">
          <Col className="d-flex justify-content-center">
            <PageTransition page={page}>
              <ListGroup variant="flush">
                {prompts.map((q, i) => (
                  <ListGroup.Item className="py-2">
                    <Likert ref={this.promptRefs[i]} qnum={i}>
                      {q}
                    </Likert>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="py-2">
                  <IconButton
                    name="Submit"
                    active={true}
                    variant="primary"
                    onClick={this.postRatings}
                  >
                    Submit
                  </IconButton>
                </ListGroup.Item>
              </ListGroup>
              <Fireworks />
            </PageTransition>
          </Col>
        </Row>
      </>
    );
  }
}

export default Survey;
