import React, { Component } from "react";
import EntryModal from "./components/entrymodal";
import SlideGroup from "./components/slidegroup";
import Intro from "./components/intro";
import Tutorial from "./components/tutorial";
import Nav from "./components/nav";
import postData from "./utils/post";

const titles = [
  "Group Similar Items",
  "A",
  "B",
  "C", 
  "D",
  "E"
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSlides: true,
    };
  }

  componentDidMount() {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((res) => postData("/logip", res));
  }

  completeEntry = (res) => {
    if (res.success) {
      this.setState({ showSlides: true });
    }
  };

  render() {
    const { showSlides } = this.state;
    if (showSlides) {
      return (
        <>
          <Nav />
          <SlideGroup titles={titles}>
            <Intro />
            <Tutorial /> 
            <h2>Welcome</h2>
            <h1>To</h1>
            <h2>This</h2>
            <h2>User</h2>
            <h4>Study</h4>
          </SlideGroup>
        </>
      );
    } else {
      return <EntryModal completeEntry={this.completeEntry} />;
    }
  }
}

export default App;
