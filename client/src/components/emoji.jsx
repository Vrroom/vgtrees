import React from "react";

function Emoji(props) {
  const { children, ...rest } = props;
  return (
    <span role="img" aria-label="emoji" {...rest}>
      {children}
    </span>
  );
}

export default Emoji;
