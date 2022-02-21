import React, { Component } from "react";
import Controller from "./components/controller";
import EntryModal from "./components/entrymodal";
import SlideGroup from "./components/slidegroup";
import postData from "./utils/post";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSlides: false,
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
        <SlideGroup>
          <h1>Hello</h1>
          <h2>Welcome</h2>
          <h1>To</h1>
          <h2>This</h2>
          <h2>User</h2>
          <h4>Study</h4>
        </SlideGroup>
      );
    } else {
      return <EntryModal completeEntry={this.completeEntry} />;
    }
  }
}

export default App;
