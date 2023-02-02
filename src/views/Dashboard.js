import React,{useState} from "react";
import ChartistGraph from "react-chartist";
import {createGet,createPost} from "../api/apis.js";

import Spinner from 'react-bootstrap/Spinner';


// react-bootstrap components
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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Dashboard() {

  const [acts, setActs] = useState(null);
  const [avg_act_per_case,setAvg_act_per_case] = useState(null);
  const [max_act_per_case,setMax_act_per_case] = useState(null);
  const [min_act_per_case,setMin_act_per_case] = useState(null);
  const [avg_time_per_case,setAvg_time_per_case] = useState(null);
  const [max_time_per_case,setMax_time_per_case] = useState(null);
  const [min_time_per_case,setMin_time_per_case] = useState(null);
  const [numcases,setNumcases] = useState(null);
  const [max_date,setMax_date] = useState(null);
  const [min_date,setMin_date] = useState(null);


  React.useEffect(() => {
    async function fetchData() {
      var res = await createGet('getkpi');
      // setGdata(res);
      setActs(res['Activities'])
      setAvg_act_per_case(res['Avg activities per case']);
      setMax_act_per_case(res['Max activities per case']);
      setMin_act_per_case(res['Min activities per case']);
      setAvg_act_per_case(res['Avg activities per case']);
      setAvg_time_per_case(res['Avg time per case'])
      setMax_time_per_case(res['Max time per case']);
      setMin_time_per_case(res['Min time per case']);
      setNumcases(res['Num of cases']);
      setMax_date(res['max_date']);
      setMin_date(res['min_date']);
      // console.log(res)
    }
    fetchData();
  }, []);
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
                      <p className="card-category">Cases</p>
                      <Card.Title as="h4">{numcases ? numcases : 
                          <Spinner animation="border" role="status">
                            
                          </Spinner>}
                      </Card.Title>
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
                      <p className="card-category">Activities</p>
                      <Card.Title as="h4">{acts? acts : 
                          <Spinner animation="border" role="status">
                           
                          </Spinner>}</Card.Title>
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
                  <Col xs="2">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="10">
                    <div className="numbers">
                      <p className="card-category">Time Period</p>
                      <Card.Title as="h4">{min_date} || {max_date}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

        </Row>
        <Row>
          {numcases ? <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Event in Time</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "9:00AM",
                        "12:00AM",
                        "3:00PM",
                        "6:00PM",
                        "9:00PM",
                        "12:00PM",
                        "3:00AM",
                        "6:00AM",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col> :  <Spinner animation="border" role="status"></Spinner> }
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Overview</Card.Title>
                {/* <p className="card-category">Last Campaign Performance</p> */}
              </Card.Header>
              <Card.Body>
           
                <Table className="table-hover table-striped">
                  <tbody>
                    <tr>
                      <td>Avg activities per case</td>
                      <td>{avg_act_per_case}</td>
                    </tr>
                    
                    <tr>
                      <td>Max activities per case</td>
                      <td>{max_act_per_case}</td>
                    </tr>
                    <tr>
                      <td>Min activities per case</td>
                      <td>{min_act_per_case}</td>
                    </tr>
                    <tr>
                      <td>Avg time per case</td>
                      <td>{avg_time_per_case}</td>
                    </tr>
                    <tr>
                      <td>Max time per case</td>
                      <td>{max_time_per_case}</td>
                    </tr>
                    <tr>
                      <td>Min time per case</td>
                      <td>{min_time_per_case}</td>
                    </tr>
                    
                    
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
       
      </Container>
    </>
  );
}

export default Dashboard;
