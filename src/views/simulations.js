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


function Simulations() {

  const [sdata, setSdata] = useState(null);

  React.useEffect(() => {
    async function fetchData() {
      var res = await createGet('getsimulation');
      setSdata(res.Cases);
     
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
                      <th className="border-0">Event</th>
                      <th className="border-0">Probability</th>
                    </tr>
                  </thead>
                    <tbody>
                      {
                      Object.keys(sdata).map((key) => {
                        console.log(sdata);
                      return <tr>
                          <td>
                            {key}
                          </td>
                          <td>
                            {sdata[key]}
                          </td>
                        </tr>
                        
                      })}
                    </tbody>
                    </Table> : "Loading"
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
