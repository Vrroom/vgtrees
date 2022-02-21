import React from "react";
import { CSSTransition } from "react-transition-group";

import "../css/transition.css";

function Transition (props) {
  return (
      <CSSTransition
        in={props.show}
        timeout={300}
        classNames="transition"
        unmountOnExit
      >
        {props.children}
      </CSSTransition>
  );
}

export default Transition;
