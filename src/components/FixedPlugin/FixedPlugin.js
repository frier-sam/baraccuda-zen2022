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

import sideBarImage1 from "assets/img/sidebar-1.jpg";
import sideBarImage2 from "assets/img/sidebar-2.jpg";
import sideBarImage3 from "assets/img/sidebar-3.jpg";
import sideBarImage4 from "assets/img/sidebar-4.jpg";

function FixedPlugin({
  start,setStart,end,setEnd,pathlenght,setPathlenght,selectedstart,selectedend,
  
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

          <li className="button-container mb-4">
            <Form.Label>Percentage Frequency</Form.Label>
            <br/>
            <input type="number" name="path_perc" min="0.1" max="1" step="0.05" value={filterstate.path_perc} onChange={handlefilterChange} />

          </li>
          <li className="button-container mb-4">
            <Form.Label>Percentage Activity</Form.Label>
            <br/>
            <input type="number" name="act_perc" min="0.1" max="1" step="0.05" value={filterstate.act_perc} onChange={handlefilterChange} />

          </li>
          <li className="button-container mb-4">
          <Form.Select name='unit' value={filterstate.act_perc} onChange={handlefilterChange}>
            <option value="seconds">seconds</option>
            <option value="hours">Hours</option>
            <option value="mins">Minutes</option>
            <option value="days">Days</option>
          </Form.Select>
          </li>
          <li className="button-container mb-4">
          <p>Start Node</p>
            <Form.Select size="sm" value={selectedstart} onChange={setStart}>
              {start.map((i,k)=><option value={i[0]}>{i[0]}</option>)}
            </Form.Select>
          </li>
          {/* <li className="button-container mb-4">
          <p>End Node</p>
            <Form.Select size="sm" multiple value={selectedend} onChange={setEnd}>
              {end.map((i,k)=><option value={i[0]}>{i[0]}</option>)}
            </Form.Select>
          </li> */}
          <li>
            <Form.Control as="select" multiple value={selectedend} onChange={setEnd}>
            <p>End Node</p>
              {end.map(options => (
                <option key={options[0]} value={options[0]}>
                  {options[0]}
                </option>
              ))}
            </Form.Control>
            </li>
          <li className="button-container mb-4">
            <Form.Label>Pathlenght</Form.Label>
            <br/>
            <input type="number"  value={pathlenght} onChange={setPathlenght} />

          </li>
          
          <Button variant="primary" onClick={()=>updatenode()}>Update</Button>

          {/* <li className="adjustments-line mt-3">
            <p>Filters</p>
            <div className="pull-right">
              <Badge
                variant="secondary"
                className={color === "black" ? "active" : ""}
                onClick={() => setColor("black")}
              ></Badge>
              <Badge
                variant="azure"
                className={color === "azure" ? "active" : ""}
                onClick={() => setColor("azure")}
              ></Badge>
              <Badge
                variant="green"
                className={color === "green" ? "active" : ""}
                onClick={() => setColor("green")}
              ></Badge>
              <Badge
                variant="orange"
                className={color === "orange" ? "active" : ""}
                onClick={() => setColor("orange")}
              ></Badge>
              <Badge
                variant="red"
                className={color === "red" ? "active" : ""}
                onClick={() => setColor("red")}
              ></Badge>
              <Badge
                variant="purple"
                className={color === "purple" ? "active" : ""}
                onClick={() => setColor("purple")}
              ></Badge>
            </div>
            <div className="clearfix"></div>
          </li>
          <li className="header-title">Sidebar Images</li>
          <li className={image === sideBarImage1 ? "active" : ""}>
            <a
              className="img-holder switch-trigger d-block"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setImage(sideBarImage1);
              }}
            >
              <img alt="..." src={sideBarImage1}></img>
            </a>
          </li>
          <li className={image === sideBarImage2 ? "active" : ""}>
            <a
              className="img-holder switch-trigger d-block"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setImage(sideBarImage2);
              }}
            >
              <img alt="..." src={sideBarImage2}></img>
            </a>
          </li>
          <li className={image === sideBarImage3 ? "active" : ""}>
            <a
              className="img-holder switch-trigger d-block"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setImage(sideBarImage3);
              }}
            >
              <img alt="..." src={sideBarImage3}></img>
            </a>
          </li>
          <li className={image === sideBarImage4 ? "active" : ""}>
            <a
              className="img-holder switch-trigger d-block"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setImage(sideBarImage4);
              }}
            >
              <img alt="..." src={sideBarImage4}></img>
            </a>
          </li>
          <li className="button-container">
            <div>
              <Button
                block
                className="btn-fill"
                href="http://www.creative-tim.com/product/light-bootstrap-dashboard-react"
                rel="noopener noreferrer"
                target="_blank"
                variant="info"
              >
                Download, it's free!
              </Button>
            </div>
          </li>
          <li className="button-container">
            <div>
              <Button
                block
                className="btn-fill"
                href="http://www.creative-tim.com/product/light-bootstrap-dashboard-react"
                rel="noopener noreferrer"
                target="_blank"
                variant="default"
              >
                Checkout docs.
              </Button>
            </div>
          </li>
          <li className="header-title pro-title text-center">
            Want more components?
          </li>
          <li className="button-container">
            <div>
              <Button
                block
                className="btn-fill"
                href="http://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react"
                rel="noopener noreferrer"
                target="_blank"
                variant="primary"
              >
                Get The PRO Version!
              </Button>
            </div>
          </li>
          <li className="header-title" id="sharrreTitle">
            Thank you for sharing!
          </li>
           */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default FixedPlugin;
