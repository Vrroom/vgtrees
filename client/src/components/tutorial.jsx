import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PageTransition from "./transition";
import GroupUI from "./groupui";
import IconButton from "./iconbutton";
import Emoji from "./emoji";
import { identical } from "../utils/listOps";
import { range } from "lodash";
import { isUndef } from "../utils/misc";
import { ReactComponent as Retry } from "../icons/retry.svg";

class TutorialMessages extends Component {
  constructor(props) {
    super(props);
    this.state = { msgId: 0 };
    this.callbacks = [];
  }

  componentDidMount() {
    const { time } = this.props;
    if (isUndef(time)) {
      return;
    }
    let totalTime = 0;
    for (let i = 0; i < time.length; i++) {
      totalTime += time[i];
      this.callbacks.push(
        setTimeout(() => {
          this.setState((prevState) => {
            return { msgId: prevState.msgId + 1 };
          });
        }, totalTime)
      );
    }
  }

  componentWillUnmount() {
    this.callbacks.map((cb) => clearTimeout(cb));
  }

  render() {
    const { children } = this.props;
    const { msgId } = this.state;
    return <PageTransition page={msgId}>{children}</PageTransition>;
  }
}

function createAndDispatchEvent(msg) {
  const evt = new CustomEvent("tutorial-transition", {
    detail: { msg },
  });
  document.dispatchEvent(evt);
}

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sid: 0,
      highlightSvg: [],
      highlightGroup: false,
      highlightGraph: [],
      highlightUndo: false,
      disableUndo: false,
      disableClear: false,
      disableGroup: false,
      disableNodes: [],
    };
    this.ref = React.createRef();
    // Define the state transition system.
    this.STATE_MACHINE = {
      states: [
        {
          id: 0,
          msg: <h4></h4>,
        },
        {
          id: 1,
          msg: <h4>Here is a mountain scenery</h4>,
          onEntry: () =>
            setTimeout(() => createAndDispatchEvent({ type: "start" }), 2500),
        },
        {
          id: 2,
          msg: <h4>Click on the tree leaves to select</h4>,
          enable: { nodes: [3] },
          highlight: { svg: [3] },
        },
        {
          id: 3,
          msg: <h4>Click on the tree outline to select</h4>,
          enable: { nodes: [10] },
          highlight: { svg: [10] },
        },
        {
          id: 4,
          msg: <h4>Click on group to combine the two</h4>,
          enable: { group: true },
          highlight: { group: true },
        },
        {
          id: 5,
          msg: <h4>Select the newly created group</h4>,
          enable: {
            clear: true,
            nodes: [3, 10],
          },
          highlight: { graph: [12] },
        },
        {
          id: 6,
          msg: <h4>Select the tree trunk</h4>,
          enable: { nodes: [4] },
          highlight: { graph: [4] },
        },
        {
          id: 7,
          msg: <h4>Group these two</h4>,
          enable: { group: true },
          highlight: { group: true },
        },
        {
          id: 8,
          msg: (
            <TutorialMessages time={[2500]}>
              <h4>Great! You grouped all the parts of the tree</h4>
              <h4>Now group the other tree</h4>
            </TutorialMessages>
          ),
          enable: {
            group: true,
            clear: true,
            nodes: [2, 5, 9],
          },
        },
        {
          id: 9,
          msg: (
            <TutorialMessages time={[1000]}>
              <h4>Well done!</h4>
              <h4>Now select and group both the trees</h4>
            </TutorialMessages>
          ),
          enable: {
            group: true,
            clear: true,
            nodes: [2, 3, 4, 5, 9, 10],
          },
          highlight: {
            svg: [2, 3, 4, 5, 9, 10],
          },
        },
        {
          id: 10,
          msg: <h4>Checking the groups...</h4>,
        },
        {
          id: 11,
          msg: (
            <h4>
              <Emoji>✅</Emoji>
            </h4>
          ),
          onEntry: () => {
            const { setHighlight, setShowNext } = this.props;
            setShowNext(true);
            setHighlight(true);
          },
        },
        {
          id: 12,
          msg: (
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
          ),
        },
        {
          id: 13,
          msg: (
            <TutorialMessages time={[1000, 2500]}>
              <h4>Nice!</h4>
              <h4>Now suppose we make a mistake...</h4>
              <h4>For example, select and group the highlighted parts</h4>
            </TutorialMessages>
          ),
          enable: {
            group: true,
            clear: true,
            nodes: [1, 7],
          },
          highlight: {
            svg: [1, 7],
          },
        },
        {
          id: 14,
          msg: (
            <TutorialMessages time={[2500, 2500]}>
              <h4>The group is wrong because the parts are unrelated</h4>
              <h4>Luckily we can undo it</h4>
              <h4>Undo the group</h4>
            </TutorialMessages>
          ),
          enable: {
            undo: true,
            clear: true,
          },
          highlight: {
            undo: true,
          },
        },
        {
          id: 15,
          msg: (
            <TutorialMessages time={[2500, 2500, 2500]}>
              <h4><Emoji>🎉</Emoji></h4>
              <h4>Now make groups for the mountain and the lake</h4>
              <h4>Remember to group a few parts at a time</h4>
              <h4>Keep this up until you have grouped the entire image</h4>
            </TutorialMessages>
          ),
          enable: {
            undo: true,
            clear: true,
            group: true,
            nodes: "all",
          },
        },
      ],
      transitions: [
        {
          from: 0,
          to: 1,
          trigger: (msg) => msg.type === "new-svg",
        },
        {
          from: 1,
          to: 2,
          trigger: (msg) => msg.type === "start",
        },
        {
          from: 2,
          to: 3,
          trigger: (msg) => msg.type === "select" && msg.selected,
        },
        {
          from: 3,
          to: 4,
          trigger: (msg) =>
            msg.type === "select" && identical(msg.selected, [3, 10]),
        },
        {
          from: 4,
          to: 5,
          trigger: (msg) =>
            msg.type === "group" && identical(msg.selected, [3, 10]),
        },
        {
          from: 5,
          to: 6,
          trigger: (msg) =>
            msg.type === "select" && identical(msg.selected, [12]),
        },
        {
          from: 6,
          to: 7,
          trigger: (msg) =>
            msg.type === "select" && identical(msg.selected, [12, 4]),
        },
        {
          from: 7,
          to: 8,
          trigger: (msg) =>
            msg.type === "group" && identical(msg.selected, [12, 4]),
        },
        {
          from: 8,
          to: 9,
          trigger: (msg) =>
            msg.type === "group" && identical(msg.paths, [2, 5, 9]),
        },
        {
          from: 9,
          to: 13,
          trigger: (msg) =>
            msg.type === "group" && identical(msg.paths, [2, 3, 4, 5, 9, 10]),
        },
        {
          from: 10,
          to: 11,
          trigger: (msg) => msg.type === "tree-check" && msg.success,
        },
        {
          from: 10,
          to: 12,
          trigger: (msg) => msg.type === "tree-check" && !msg.success,
        },
        {
          from: 13,
          to: 14,
          trigger: (msg) =>
            msg.type === "group" && identical(msg.paths, [1, 7]),
        },
        {
          from: 14,
          to: 15,
          trigger: (msg) => msg.type === "undo",
        },
        {
          from: 15,
          to: 10,
          trigger: (msg) => msg.type === "group" && msg.paths.length === 12,
        },
      ],
    };
    document.addEventListener("tutorial-transition", this.notification);
  }

  interactionStates = (nxtState) => {
    const len = this.ref.current.state.graph.nodes.length;
    let highlightSvg = [],
      highlightGroup = false,
      highlightGraph = [],
      highlightUndo = false;
    let disableClear = false,
      disableGroup = false,
      disableUndo = false,
      disableNodes = range(0, len);
    const { highlight, enable } = nxtState;
    if (!isUndef(highlight)) {
      const { svg, group, graph, undo } = highlight;
      if (!isUndef(svg)) highlightSvg = highlightSvg.concat(svg);
      highlightGroup = isUndef(group) ? false : group;
      highlightUndo = isUndef(undo) ? false : undo;
      if (!isUndef(graph)) highlightGraph = highlightGraph.concat(graph);
    }
    if (!isUndef(enable)) {
      const { clear, group, nodes, undo } = enable;
      disableClear = isUndef(clear) ? true : !clear;
      disableGroup = isUndef(group) ? true : !group;
      disableUndo = isUndef(undo) ? true : !undo;
      if (!isUndef(nodes)) {
        if (nodes !== "all")
          disableNodes = range(0, len).filter((i) => !nodes.includes(i));
        else disableNodes = [];
      }
    }
    return {
      highlightSvg,
      highlightGroup,
      highlightGraph,
      highlightUndo,
      disableClear,
      disableGroup,
      disableNodes,
      disableUndo,
    };
  };

  notification = (evt) => {
    const msg = evt.detail.msg;
    this.setState((prevState) => {
      const { sid } = prevState;
      for (let i = 0; i < this.STATE_MACHINE.transitions.length; i++) {
        const transition = this.STATE_MACHINE.transitions[i];
        if (transition.from === sid && transition.trigger(msg)) {
          const nxtState = this.STATE_MACHINE.states
            .filter((s) => s.id === transition.to)
            .pop();
          if (!isUndef(nxtState.onEntry)) nxtState.onEntry();
          const interactions = this.interactionStates(nxtState);
          return {
            sid: transition.to,
            ...interactions,
          };
        }
      }
    });
  };

  reset = () => {
    this.setState({
      sid: 0,
      highlightSvg: [],
      highlightGroup: false,
      highlightGraph: [],
      highlightUndo: false,
      disableUndo: false,
      disableClear: false,
      disableGroup: false,
      disableNodes: [],
    });
    this.ref.current.resetToInit();
  };

  childNotification = (msg) => {
    createAndDispatchEvent({ ...msg });
    // this.setState((prevState) => {
    //   const { messageId } = prevState;
    //   let { current } = this.ref;
    //   const len = current.state.graph.nodes.length;
    //       }
    //     }
    //   } else if (messageId === 11 || messageId === 12 || messageId === 13) {
    //     if (msg.type === "group") {
    //       this.callbacks.map((cb) => clearTimeout(cb));
    //       const { nodes } = current.state.graph;
    //       const pathset = msg.selected.map((i) => nodes[i].paths).flat();
    //       if (pathset.length === 12) {
    //         return { messageId: 14 };
    //       }
    //     }
    //   } else if (messageId === 14) {
    //     if (msg.type === "tree-check") {
    //       if (msg.success) {
    //         const { setHighlight, setShowNext } = this.props;
    //         setShowNext(true);
    //         setHighlight(true);
    //         return { messageId: 15 };
    //       } else {
    //         return { messageId: 16 };
    //       }
    //     }
    //   }
    // });
  };

  componentWillUnmount() {
    const { setHighlight, setShowNext } = this.props;
    setHighlight(false);
    setShowNext(false);
  }

  render() {
    const { sid, ...rest } = this.state;
    return (
      <Row className="py-3 justify-content-center">
        <Col className="d-flex col-10 justify-content-center">
          <PageTransition page={sid}>
            {this.STATE_MACHINE.states.map((s, i) => (
              <div key={`state-${i}`}>{s.msg}</div>
            ))}
          </PageTransition>
        </Col>
        <GroupUI
          ref={this.ref}
          src="tutorialgraphic"
          target="/checktutorial"
          metadata={{}}
          notifyParent={this.childNotification}
          {...rest}
        />
      </Row>
    );
  }
}

export default Tutorial;
