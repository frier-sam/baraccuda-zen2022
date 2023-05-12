import React from "react";
// react plugin for creating notifications over the dashboard

// react-bootstrap components
import {
  Alert,
  Badge,
  Button,
  Card,
  Modal,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Image
} from "react-bootstrap";
import Bench  from './benchmark.png';

function Benchmark() {

 
  return (
    <>

      <Container fluid>
        <h2>(TBD)</h2>
        <Image src={Bench} style={{"width":"100%"}}/>
        {/* End Modal */}
      </Container>
    </>
  );
}

export default Benchmark;
