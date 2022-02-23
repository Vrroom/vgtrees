import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PageTransition from "./transition"; 
import GroupUI from "./groupui"; 
import Emoji from "./emoji"; 

class Tutorial extends Component {

  constructor (props) {
    super(props);
    this.state = { 
      messageId: 0
    }; 
  }

  render () {
    return (
      <Row className="py-3 justify-content-center"> 
        <Col className="d-flex col-6 border-bottom justify-content-center">
          <PageTransition page={this.state.messageId}> 
            <h4>Click on the tree leaves to select</h4>
            <h4>Click on the tree outline to select</h4> 
            <h4>Click on group to combine the two</h4>
            <h4>Select the tree trunk</h4>
            <h4>Select the leaves</h4> 
            <h4>Group these two</h4> 
            <h4>Continue grouping related parts</h4>
            <h4>Group only a few objects at a time</h4>
            <h4>Double-click on a group to undo it</h4>
            <Emoji>❌</Emoji>
            <Emoji>✅</Emoji>
          </PageTransition>
        </Col>
        <GroupUI src="tutorialgraphic" />
      </Row>
    );
  }

}

export default Tutorial; 
