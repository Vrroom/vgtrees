import React from "react";
import SlideGroup from "./slidegroup";
import Intro from "./intro";
import Tutorial from "./tutorial";
import Nav from "./nav";
import Survey from "./survey";
import GroupUI from "./groupui";
import Comments from "./comments";
import TaskIntro from "./taskintro";

function Slides(props) {
  return (
    <>
      <Nav />
      <SlideGroup>
        <Intro />
        <Tutorial />
        <TaskIntro />
        <GroupUI src="task" metadata={{ taskNum: 0 }} />
        <GroupUI src="task" metadata={{ taskNum: 1 }} />
        <GroupUI src="task" metadata={{ taskNum: 2 }} />
        <GroupUI src="task" metadata={{ taskNum: 3 }} />
        <GroupUI src="task" metadata={{ taskNum: 4 }} />
        <Survey />
        <Comments />
      </SlideGroup>
    </>
  );
}

export default Slides;
