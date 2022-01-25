import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Controller from "./components/controller";

class App extends Component {

  componentDidMount () {
    // use a service to obtain user ip address 
    // and post it to the server.
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(res => {
        fetch("/logip", {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(res)
        })
      });
  }

  render() {
    return (
      <Container id="app-container">
        <Container>
          <Navbar>
            <Navbar.Brand>SVG HIERARCHY</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end" />
          </Navbar>
        </Container>
        <Controller />
      </Container>
    );
  }
}

export default App;
