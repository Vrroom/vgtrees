import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function ConsentForm(props) {
  return (
    <Container className="px-5">
      <Row>
        <Col>
          <p className="lead">
            You are being asked to participate in a study on visual perception.
          </p>
          <p> Estimated time: 10 min</p>
          <h4>Purpose</h4>
          <p>
            This study aims to understand how humans recognize parts in images,
            specifically in vector images. These images are made of lines,
            curves and shapes. They are used in games and cartoons. Think Tom
            and Jerry. One might draw Jerry's face using circles for the eyes, a
            triangle for the nose and a few lines and curves for the mouth. We
            want to understand how humans make sense of these individual shapes
            and conclude that they are looking at Jerry.
          </p>
          <h4>Procedures</h4>
          <p>The study is divided into three phases.</p>
          <p>
            The first phase is devoted towards ensuring that you understand the
            goal of this study. You will complete a tutorial. The tutorial will
            walk you through our annotation interface and teach you how to
            produce annotations that we are interested in.
          </p>
          <p>
            In the second phase, you'll use the interface to annotate the
            graphics given to you. While creating these annotations, keep in
            mind that we are interested in how you perceive similarity between
            different parts in a graphic.
          </p>
          <p>
            Finally, in the third phase, you'll be asked to share you
            experiences. You'll fill out a small questionnaire and an open-ended
            comments section. Upon completion, you'll be given a survey code
            which you can enter on the Amazon Mechanical Turk website to confirm
            your participation.
          </p>
          <h4>Risks</h4>
          <p>
            We use cookies to correlate session activity. We also store your
            email ID, MTurk ID and IP Address. This helps us ensure the
            authenticity of our participants but also exposes you to privacy
            related risks.
          </p>
          <h4>Benefits</h4>
          <p>
            Participating in this study would be enjoyable if you have an
            interest in computer graphics and related technologies. You will
            also be compensated monetarily.
          </p>
          <h4>Compensation to You</h4>
          <p>Your compensation will be based on:</p>
          <ol>
            <li>
              Whether you were an authentic participant. We will judge this
              using cookies, a captcha, your MTurk ID and your IP address.
            </li>
            <li>
              Whether you demonstrated an understanding of the goals of the
              study. We'll judge this based on your responses in the first and
              second phases of the study.
            </li>
          </ol>
          <h4>Participation Rights</h4>
          <ol>
            <li> Your participation is completely voluntary. </li>
            <li>
              You can terminate your participation at any time, simply by
              closing the browser window.
            </li>
            <li>
              You may contact us at any time, regarding any inconvenience you
              face.
            </li>
          </ol>
        </Col>
      </Row>
    </Container>
  );
}

export default ConsentForm;
