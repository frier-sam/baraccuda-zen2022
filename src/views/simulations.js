import React,{useState} from "react";
import {createGet,createPost} from "../api/apis.js";
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
  Table
} from "react-bootstrap";

import Spinner from 'react-bootstrap/Spinner';


function Simulations() {

  const [sdata, setSdata] = useState(null);

  React.useEffect(() => {
    async function fetchData() {
      var res = await createGet('getsimulation');
      setSdata(res['result']);
     
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
                <Card.Title as="h4">Simulations</Card.Title>
                <p className="card-category">
                  Hand Picked Simulations cases
                </p>
              </Card.Header>
              <Card.Body className="all-icons">
                <Row>
                  {
                    sdata ? 
                    <Table className="table-hover table-striped">
                      <thead>
                    <tr>
                      <th className="border-0">Case ID</th>
                      <th className="border-0">Probability Of Cancellation</th>
                    </tr>
                  </thead>
                    <tbody>
                      { sdata && 
                      sdata.map((i) => {
                       
                      return <tr>
                          <td>
                            {i[0]}
                          </td>
                          <td>
                            {i[1]}
                          </td>
                        </tr>
                        
                      })}
                    </tbody>
                    </Table> : <Spinner animation="border" role="status"></Spinner>
                  }
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Simulations;
