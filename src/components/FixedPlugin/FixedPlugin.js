/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, { Component } from "react";

import { Dropdown, Badge, Button, Form } from "react-bootstrap";


import Spinner from 'react-bootstrap/Spinner';

function FixedPlugin({
  loading,start,setStart,end,setEnd,pathlenght,setPathlenght,selectedstart,selectedend,
  
  filterstate,handlefilterChange,updatenode
}) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     classes: "dropdown show-dropdown open",
  //     bg_checked: true,
  //     bgImage: this.props.bgImage,
  //   };
  // }
  // handleClick = () => {
  //   this.props.handleFixedClick();
  // };
  // onChangeClick = () => {
  //   this.props.handleHasImage(!this.state.bg_checked);
  //   this.setState({ bg_checked: !this.state.bg_checked });
  // };
  return (
    <div className="fixed-plugin">
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-fixed-plugin"
          variant=""
          className="text-white border-0 opacity-100"
        >
          <i className="fas fa-cogs fa-2x mt-1"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>

          <li className="button-container">
            <Form.Label>Percentage Frequency : </Form.Label>
           
            <input type="number" name="path_perc" min="0.1" max="1" step="0.05" value={filterstate.path_perc} onChange={handlefilterChange} />

          </li>
          <li className="button-container">
            <Form.Label>Percentage Activity : </Form.Label>
           
            <input type="number" name="act_perc" min="0.1" max="1" step="0.05" value={filterstate.act_perc} onChange={handlefilterChange} />

          </li>
          <li className="button-container">
          <Form.Label>Unit : </Form.Label>
          <Form.Select name='unit' value={filterstate.unit} onChange={handlefilterChange}>
            <option value="seconds">seconds</option>
            <option value="hours">Hours</option>
            <option value="mins">Minutes</option>
            <option value="days">Days</option>
          </Form.Select>
          </li>
          <li className="button-container">
          <Form.Label>View Type : </Form.Label>
          <Form.Select name='view_type' value={filterstate.view_type} onChange={handlefilterChange}>
            <option value="act_cnt">Activity or event count</option>
            <option value="case_cnt">Case Count</option>
            <option value="performace">Time between two activities</option>
          </Form.Select>
          </li>
          <li className="button-container">
            <br/>
          <Form.Label>Start Node : </Form.Label>
            <Form.Select size="sm" value={selectedstart} onChange={setStart}>
              {start.map((i,k)=><option value={i[0]}>{i[0]}</option>)}
            </Form.Select>
          </li>
          {/* <li className="button-container mb-4">
          <p>End Node</p>
            <Form.Select size="sm" multiple value={selectedend} onChange={setEnd}>
              {end.map((i,k)=><option value={i[0]}>{i[0]}</option>)}
            </Form.Select>
          </li>  //value={filterstate.endnode}*/}
          <li className="" style={{
            'width': '100%',
            'min-height': 'inherit',
            'text-align': 'center',
          }}>
          <Form.Label>End Node</Form.Label>
          <br/>
            <Form.Control name='endnode' as="select" multiple value={filterstate.endnode}  onChange={setEnd}> 
              {end.map(options => (
                <option key={options[0]} value={options[0]}>
                  {options[0]}
                </option>
              ))}
            </Form.Control>
            </li>
            <br/>
          {/* <li className="button-container mb-4">
            <Form.Label>Pathlenght</Form.Label>
            <br/>
            <input type="number"  value={pathlenght} onChange={setPathlenght} />

          </li> */}
          {loading && <Spinner animation="border" role="status"></Spinner>}
          <li className="button-container mb-4">
            <Button variant="primary" onClick={()=>updatenode()}>Update</Button>
          </li>
          <li className="button-container mb-4">
            <Button variant="primary" onClick={()=>window.location.reload()}>Reset Filters</Button>
          </li>
          

        
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default FixedPlugin;
