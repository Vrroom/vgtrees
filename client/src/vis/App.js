import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InfiniteScroll from "react-infinite-scroll-component";
import GraphicDisplay from "./graphicdisplay";
import { postData } from "../utils/post";
import { preprocessSVG } from "../utils/svg";
import { chunk } from "lodash";

const N = 25;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { svgs: [] };
  }

  componentDidMount() {
    this.fetchMoreData();
  }

  fetchMoreData = () => {
    const { svgs } = this.state;
    postData("/emoji-dataset", { startId: svgs.length, number: N }).then(
      (res) => {
        this.setState((prevState) => {
          const { svgs } = prevState;
          return { svgs: svgs.concat(res.svgs) };
        });
      }
    );
  };

  render() {
    const { svgs } = this.state;
    return (
      <Container>
        <Row className="p-3 border-bottom">
          <Col>
            <h1>Interesting OpenMoji Graphics</h1>
          </Col>
        </Row>
        <InfiniteScroll
          dataLength={svgs.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {chunk(svgs, 5).map((group, gkey) => (
            <Row>
              {group.map((svg, key) => (
                <Col key={`svg-${gkey}-${key}`}>
                  <GraphicDisplay graphic={preprocessSVG(svg)} />
                </Col>
              ))}
            </Row>
          ))}
        </InfiniteScroll>
      </Container>
    );
  }
}

export default App;
