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
import Dashboard from "views/Dashboard.js";
import ProcessExplorer from "views/processexplore.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import RcaEda from "views/rcaeda.js";
import Simulations from "views/simulations.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Benchmark from "views/Benchmark";
import Upgrade from "views/Upgrade.js";
import Conformance from "views/Conformance"

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin"
  // },
  {
    path: "/dashboard",
    name: "Overview (KPI)",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/processminining",
    name: "Process explorer",
    icon: "nc-icon nc-circle-09",
    component: ProcessExplorer,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Variant explorer",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/RCA-EDA",
    name: "RCA/EDA",
    icon: "nc-icon nc-paper-2",
    component: RcaEda,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Simulations",
    icon: "nc-icon nc-atom",
    component: Simulations,
    layout: "/admin"
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin"
  // },
  
  {
    path: "/Conformance",
    name: "Conformance",
    icon: "nc-icon nc-attach-87",
    component: Conformance,
    layout: "/admin"
  },
  {
    path: "/Benchmark",
    name: "Benchmark",
    icon: "nc-icon nc-chart",
    component: Benchmark,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  }
];

export default dashboardRoutes;
