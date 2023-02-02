import React,{useState} from "react";


// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
// import Plot from 'react-plotly.js';
// import Plotly from 'plotly.js/dist/plotly';

import {Creategraph} from './creategraph.js';

import {createGet,createPost} from "../api/apis.js";
import Spinner from 'react-bootstrap/Spinner';


function RcaEda() {

  const [gdata, setGdata] = useState(null);

  React.useEffect(() => {
    async function fetchData() {
      var res = await createGet('getrca');
      setGdata(res);
      console.log(res)
    }
    fetchData();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">RCA EDA Analysis</Card.Title>
                <p className="card-category">
                  Graphing Method
                </p>
              </Card.Header>
              <Card.Body>
              {gdata ? 
              <>{Object.keys(gdata).map(key => {
                const sgdata = JSON.parse(gdata[key]);
                return <Creategraph key={key} plotData={sgdata} />
              })}
              </>
              : <Spinner animation="border" role="status"></Spinner>}
              
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RcaEda;
