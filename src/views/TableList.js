import React,{useState, useEffect} from "react";
import {createGet} from "../api/apis.js";
import {Creategraph} from './creategraph.js';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import './varient.css';
import ProcessExplorerWidget from './processwidget.js'


import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';


function TableList() {

  const [totalevents, setTotalevents] = useState(null);
  const [totalcases, setTotalcases] = useState(null);
  const [totalvariants, setTotalvariants] = useState(null);
  const [plotdata, setPlotdata] = useState(null);
  const [variantlist, setVariantlist] = useState(null);
  const [variants, setVariants] = useState(null); // to store variant data
  const [selectedVariant, setSelectedVariant] = useState(null); // to store selected variant key
  const [elements,setElements] = useState(null)

  async function fetchData() {
    if (selectedVariant){ 
      var res = await createGet('getvariant?topn='+selectedVariant);
      }
    else{ 
        var res = await createGet('getvariant');
      }
    // var res = await createGet('getvariant');
    console.log(res)
    setTotalcases(res['num_cases'])
    setTotalevents(res['total_events'])
    setTotalvariants(res['number_variants'])
    setPlotdata(JSON.parse(res['plot_data']))
    setVariantlist(res['variant_top10'])
    setVariants(res['Varients']) // store the Varients data in state
    setElements({'dfg':res['dfg']})
  }

  useEffect(() => {
    
    fetchData();
  }, [selectedVariant]);

  const unique = (arr) => [...new Set(arr)]
 

  // handle the variant selection from dropdown
  const handleVariantSelect = (key) => {
    console.log('key',key)
    setSelectedVariant(key);
    // fetchData();
  }
  return (
    <>
      <Container fluid>
        <Row>
        <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total</p>
                      <Card.Title as="h4">{totalcases}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
 
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">variants</p>
                      <Card.Title as="h4">{totalvariants}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
 
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Events</p>
                      <Card.Title as="h4">{totalevents}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
 
            </Card>
          </Col>
        </Row>
        <Row>
        
        <Col  lg="6" md="6" sm="6">
    
                  
    
          {/* <Card>
            <Card.Body>
              <Dropdown onSelect={handleVariantSelect}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Select Variant
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {variants && Object.keys(variants).map((key,enu) => 
                    <Dropdown.Item eventKey={key}>Variant {enu+1}</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              
              {selectedVariant && <div className="flow-chart">
                {unique(variants[selectedVariant]).map((node, i) => 
                  <React.Fragment key={i}>
                    <span className="node">{node}</span>
                    {i < variants[selectedVariant].length - 1 && <span className="arrow">--></span>}
                  </React.Fragment>
                )}
              </div>}
              </Card.Body>
            </Card> */}
            <Dropdown onSelect={handleVariantSelect}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Number of Variant
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {[1,2,3,4,5,6,7,8,9,10].map((key,enu) => 
                    <Dropdown.Item eventKey={key}>Top Variant {key}</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              {plotdata ? <Creategraph plotData={plotdata} /> : <Spinner animation="border" role="status"></Spinner>}
        </Col>
        <Col lg="6" md="6" sm="6">
        {elements && <ProcessExplorerWidget res={elements}/>}
        </Col>
        
        {/* <Col Col lg="6" md="6" sm="12">
        {variantlist && <Accordion className="col-12">
              {variantlist.map((variant,e)=>
                <Accordion.Item eventKey={e}>
                  <Accordion.Header>Varient - {e}</Accordion.Header>
                  <Accordion.Body>
                    {variant.map((name,i)=>name+'--->')}
                  </Accordion.Body>
                </Accordion.Item>

              )}
          </Accordion>
          }
        </Col> */}
        </Row>
      
          
        
      </Container>
    </>
  );
}

export default TableList;
