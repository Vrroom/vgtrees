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
          <p> Estimated time: 20 min</p> 
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
            goal of this study. We will show you a set of shapes from a graphic
            and ask you whether the set of shapes form a coherent part of the
            graphic.
          </p>
          <p>
            In the second phase you will interact with our annotation interface.
            You will be shown a graphic and the individual shapes that it is
            composed of. You’ll be asked to group related parts together. You
            might want to think of it as a bottom-up assembly of a graphic
            starting from simple shapes. As you are grouping parts, you may be
            asked to explain your clustering decisions in a few short phrases.
          </p>
          <p>
            Finally, in the third phase, you'll be asked to share your
            experiences regarding the study. You will assess your performance
            and report the time taken to complete the study.
          </p>
          <h4>Risks</h4>
          <p>
            We use cookies to correlate session activity. Additionally, we store
            your MTurk ID and IP Address. This helps us ensure the authenticity
            of our participants but also exposes you to privacy related risks.
          </p>
          <h4>Benefits</h4>
          <p>
            Participating in this study would be enjoyable if you have an
            interest in computer graphics and related technologies. You will be
            compensated monetarily.
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
            <li>
              Your self-reported study completion times. We'll calculate median
              study completion times across participants and will guarantee to
              pay at least US minimum wage for the median completion time.
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
