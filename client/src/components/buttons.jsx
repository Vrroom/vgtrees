import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import accept from "../icons/accept.svg";
import reject from "../icons/reject.svg";
import group from "../icons/group.svg";
import Button from "./button";

class Buttons extends Component {
  render() {
    const {
      clickAccept,
      clickGroup, 
      clickReject
    } = this.props;
    return (
      <Row className="justify-content-around">
        <Button 
          src={accept}
          name="Accept"
          active={true}
          alt="Accept"
          onClick={clickAccept}
        />
        <Button
          src={group}
          name="Group"
          active={true}
          alt="Group"
          onClick={clickGroup}
        />
        <Button 
          src={reject}
          name="Reject"
          active={true}
          alt="Reject"
          onClick={clickReject}
        />
      </Row>
    );
  }
}

export default Buttons;
