import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PageTransition from "./transition"; 
import GroupUI from "./groupui"; 
import h4 from "./blinktext"; 
import Emoji from "./emoji"; 
import { identical } from "../utils/listOps"; 

class Tutorial extends Component {

  constructor (props) {
    super(props);
    this.state = { 
      messageId: 0
    }; 
    this.ref = React.createRef(); 
  }

  chainMessages = (ids) => {
    if (ids.length === 0) {
      return;
    }
    setTimeout(() => {
      this.setMessage(ids[0]);
      this.chainMessages(ids.slice(1)); 
    }, 2500);
  }

  setMessage = (id) => {
    this.setState({ messageId: id });
  }

  childNotification = (msg) => {
    this.setState((prevState) => {
      const { messageId } = prevState;
      let { current } = this.ref;
      if (messageId === 0) {
        if (msg.type === "new-svg") {
          setTimeout(() => {
            current.setState({ highlightSvg: [3] }); 
            this.setMessage(1);
          }, 2500); 
        }
      } else if (messageId === 1) {
        if (msg.type === "select" && identical(msg.selected, [3])) {
          current.setState({ highlightSvg: [10] }); 
          return { messageId: 2 };
        }
      } else if (messageId === 2) {
        if (msg.type === "select" && identical(msg.selected, [3, 10])) {
          current.setState({ highlightGroup: true, highlightSvg: [] }); 
          return { messageId: 3 }; 
        }
      } else if (messageId === 3) {
        if (msg.type === "group" && identical(msg.selected, [3, 10])) {
          current.setState({ highlightGroup: false, highlightGraph: [12] }); 
          this.chainMessages([5]); 
          return { messageId: 4 }; 
        }
      } else if (messageId === 5) {
        if (msg.type === "select" && identical(msg.selected, [12])) {
          current.setState({ highlightGraph: [4] }); 
          return { messageId: 6 }; 
        }
      } else if (messageId === 6) {
        if (msg.type === "select" && identical(msg.selected, [12, 4])) {
          current.setState({ highlightGroup: true, highlightGraph: [] }); 
          return { messageId: 7 }; 
        }
      } else if (messageId === 7) {
        if (msg.type === "group" && identical(msg.selected, [12, 4])) {
          current.setState({ highlightGroup: false, highlightGraph: [] }); 
          this.chainMessages([9]);
          return { messageId: 8 }; 
        }
      } else if (messageId === 9) {
        if (msg.type === "group") {
          const { nodes } = current.state.graph;
          const pathset = msg.selected.map(i => nodes[i].paths).flat();
          if (identical(pathset, [2, 5, 9])) {
            this.chainMessages([11, 12, 13]); 
            return { messageId: 10 }; 
          }
        }
      } else if (messageId === 13) {
        if (msg.type === "group") {
          const { nodes } = current.state.graph;
          const pathset = msg.selected.map(i => nodes[i].paths).flat();
          if (pathset.length === 12) {
            const { setHighlight } = this.props;
            setHighlight(true);
            return { messageId: 14 }; 
          }
        }
      }
    });
  }

  componentWillUnmount () { 
    const { setHighlight } = this.props;
    setHighlight(false);
  }

  render () {
    return (
      <Row className="py-3 justify-content-center"> 
        <Col className="d-flex col-8 border-bottom justify-content-center">
          <PageTransition page={this.state.messageId}> 
            <h4>Here is a mountain scenery</h4>
            <h4>Click on the tree leaves to select</h4>
            <h4>Click on the tree outline to select</h4> 
            <h4>Click on group to combine the two</h4>
            <h4>A group containing the two is created</h4>
            <h4>Select the newly created group</h4> 
            <h4>Select the tree trunk</h4>
            <h4>Group these two</h4> 
            <h4>Great! You grouped all the parts of the tree</h4>
            <h4>Now group the other tree</h4>
            <h4>Well done!</h4>
            <h4>Finish grouping the whole scenery</h4>
            <h4>Group only a few objects at a time</h4>
            <h4>If you want to undo a group, double-click on it</h4> 
            <h4><Emoji>✅</Emoji></h4>
          </PageTransition>
        </Col>
        <GroupUI ref={this.ref} src="tutorialgraphic" notifyParent={this.childNotification} />
      </Row>
    );
  }

}

export default Tutorial; 
