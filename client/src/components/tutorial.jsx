import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PageTransition from "./transition";
import GroupUI from "./groupui";
import IconButton from "./iconbutton";
import Emoji from "./emoji";
import { identical } from "../utils/listOps";
import { range } from "lodash";
import { ReactComponent as Retry } from "../icons/retry.svg";

function allBut(len, id) {
  return range(0, len).filter((i) => i !== id);
}

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageId: 0,
      highlightSvg: [],
      highlightGroup: false,
      highlightGraph: [],
      disableClear: false,
      disableGroup: false,
      disableNodes: [],
    };
    this.ref = React.createRef();
    this.callbacks = [];
  }

  reset = () => {
    this.setState({
      messageId: 0,
      highlightSvg: [],
      highlightGroup: false,
      highlightGraph: [],
      disableClear: false,
      disableGroup: false,
      disableNodes: [],
    });
    this.ref.current.resetToInit();
  };

  chainMessages = (ids) => {
    if (ids.length === 0) {
      return;
    }
    this.callbacks.push(
      setTimeout(() => {
        this.setMessage(ids[0]);
        this.chainMessages(ids.slice(1));
      }, 2500)
    );
  };

  setMessage = (id) => {
    this.setState({ messageId: id });
  };

  childNotification = (msg) => {
    this.setState((prevState) => {
      const { messageId } = prevState;
      let { current } = this.ref;
      const len = current.state.graph.nodes.length;
      if (messageId === 0) {
        if (msg.type === "new-svg") {
          this.callbacks.push(
            setTimeout(() => {
              this.setState({ highlightSvg: [3] });
              this.setMessage(1);
            }, 2500)
          );
          return { disableNodes: allBut(len, 3) };
        }
      } else if (messageId === 1) {
        if (msg.type === "select" && identical(msg.selected, [3])) {
          return {
            messageId: 2,
            highlightSvg: [10],
            disableClear: true,
            disableNodes: allBut(len, 10),
          };
        }
      } else if (messageId === 2) {
        if (msg.type === "select" && identical(msg.selected, [3, 10])) {
          return {
            messageId: 3,
            highlightGroup: true,
            disableNodes: range(0, len),
            highlightSvg: [],
          };
        }
      } else if (messageId === 3) {
        if (msg.type === "group" && identical(msg.selected, [3, 10])) {
          this.callbacks.push(
            setTimeout(() => {
              this.setState({ disableNodes: allBut(len, 12) });
              this.setMessage(5);
            })
          );
          return {
            messageId: 4,
            highlightGroup: false,
            disableClear: false,
            highlightGraph: [12],
            disableNodes: range(0, len),
          };
        }
      } else if (messageId === 5) {
        if (msg.type === "select" && identical(msg.selected, [12])) {
          return {
            messageId: 6,
            highlightGraph: [4],
            disableClear: true,
            disableNodes: allBut(len, 4),
          };
        }
      } else if (messageId === 6) {
        if (msg.type === "select" && identical(msg.selected, [12, 4])) {
          return { messageId: 7, highlightGroup: true, highlightGraph: [] };
        }
      } else if (messageId === 7) {
        if (msg.type === "group" && identical(msg.selected, [12, 4])) {
          this.chainMessages([9]);
          return {
            messageId: 8,
            highlightGroup: false,
            disableClear: false,
            disableNodes: [],
            highlightGraph: [],
          };
        }
      } else if (messageId === 9) {
        if (msg.type === "group") {
          const { nodes } = current.state.graph;
          const pathset = msg.selected.map((i) => nodes[i].paths).flat();
          if (identical(pathset, [2, 5, 9])) {
            this.chainMessages([11, 12, 13]);
            return { messageId: 10 };
          }
        }
      } else if (messageId === 11 || messageId === 12 || messageId === 13) {
        if (msg.type === "group") {
          this.callbacks.map((cb) => clearTimeout(cb));
          const { nodes } = current.state.graph;
          const pathset = msg.selected.map((i) => nodes[i].paths).flat();
          if (pathset.length === 12) {
            return { messageId: 14 };
          }
        }
      } else if (messageId === 14) {
        if (msg.type === "tree-check") {
          if (msg.success) {
            const { setHighlight } = this.props;
            setHighlight(true);
            return { messageId: 15 };
          } else {
            return { messageId: 16 };
          }
        }
      }
    });
  };

  componentWillUnmount() {
    const { setHighlight } = this.props;
    setHighlight(false);
    this.callbacks.map((cb) => clearTimeout(cb));
  }

  render() {
    const {
      highlightSvg,
      highlightGroup,
      highlightGraph,
      disableClear,
      disableGroup,
      disableNodes,
    } = this.state;
    return (
      <Row className="py-3 justify-content-center">
        <Col className="d-flex col-10 justify-content-center">
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
            <h4>Checking the groups...</h4>
            <h4>
              <Emoji>✅</Emoji>
            </h4>
            <Row>
              <Col className="col-10">
                <h4>
                  <Emoji>❌</Emoji> Grouping seems wrong
                </h4>
              </Col>
              <Col className="col-2">
                <IconButton
                  name="Retry"
                  active={true}
                  onClick={this.reset}
                  highlight={true}
                >
                  <Retry />
                </IconButton>
              </Col>
            </Row>
          </PageTransition>
        </Col>
        <GroupUI
          ref={this.ref}
          src="tutorialgraphic"
          target="/checktutorial"
          metadata={{}}
          notifyParent={this.childNotification}
          highlightGroup={highlightGroup}
          highlightGraph={highlightGraph}
          highlightSvg={highlightSvg}
          disableClear={disableClear}
          disableGroup={disableGroup}
          disableNodes={disableNodes}
        />
      </Row>
    );
  }
}

export default Tutorial;
