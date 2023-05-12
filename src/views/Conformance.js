import React from "react";
// react plugin for creating notifications over the dashboard

// react-bootstrap components
import {
  Container,
  Image
} from "react-bootstrap";
import Bench  from './conf.png';

function Conformance() {

 
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

export default Conformance;
