import React, { Component } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

class IconButton extends Component {

  onClick = (evt) => {
    this.setState({ show: true });
    this.props.onClick(evt);
  };

  render() {
    const { active, children } = this.props;
    return (
      <Row> 
        <Col className="d-flex justify-content-center"> 
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>{this.props.name}</Tooltip>}
          >
            <div className={active ? "visible" : "invisible"}>
              <Button variant="light" onClick={this.onClick}> {children} </Button>
            </div>
          </OverlayTrigger> 
        </Col>
      </Row>
    );
  }
}

export default IconButton;
