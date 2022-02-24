import React, { Component } from "react";
import EntryModal from "./components/entrymodal";
import Slides from "./components/slides";
import postData from "./utils/post";

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
      return <Slides /> 
    } else {
      return <EntryModal completeEntry={this.completeEntry} />;
    }
  }
}

export default App;
