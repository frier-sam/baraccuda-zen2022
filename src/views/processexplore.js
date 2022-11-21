import React, { useState, useCallback } from "react";
// import { useCallback } from 'react';

import {createGet} from "../api/apis.js";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider, 
  useReactFlow ,
  setNodes,
  setEdges,
} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';
import './flow.css';
import dagre from 'dagre';
import FixedPlugin from "../components/FixedPlugin/FixedPlugin.js";

const initialNodes = [
  { id: '1',position:{x:0,y:0},  data: { label: '1' } },
  { id: '2', position:{x:0,y:50}, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 80;
const nodeHeight = 36;


const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);


function ProcessExplorer() {
  const [fnodes, setNodes] = useState();
  const [fedges, setEdges] = useState();

  const [startfilter, setStartfilter] = useState([]);
  const [endfilter , setEndfilter] = useState([]);

  const [selectedstart, setSelectedstart] = useState();
  const [selectedend, setSelectedend] = useState();
  const [pathlenght , setPathlenght] = useState(0);
  const [frequencie, setFrequencie] = useState();
  const [performance,setPerformance] = useState();
  const [filternodes, setFilternodes] = useState([]);


  const getnodes = async () =>
    {
    var res = await createGet('getrenderdata');
    return res
  }
  
  React.useEffect(() => {

  getnodes().then((res)=>{
    console.log(res['dfg'][0]);
  const nodes = res['dfg'][0];
  const edges = res['dfg'][1];
  // const isHorizontal = direction === 'LR';
  const direction = 'TB'
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = 'top';
    node.sourcePosition = 'left';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth/0.1,
      y: nodeWithPosition.y - nodeHeight/0.1,
    };

    return node;
  });

  setNodes(nodes)
  setEdges(edges)
  var startlist = Object.keys(res['start']).map((key) => [key, res['start'][key]]);
  var endlist = Object.keys(res['end']).map((key) => [key, res['end'][key]]);

  setStartfilter(startlist)
  setEndfilter(endlist)
  }).then(()=>
  {console.log('fnodes',fnodes);
    console.log('fedges',fedges);}
  )

    
  }, []);

    

  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  


  return (
    <div >
      {/* {getdata()} */}
    {<ReactFlow
      nodes={fnodes}
      edges={fedges}
      // onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      // onConnect={onConnect}
      onInit={onInit}
      fitView
    >
      <MiniMap />
      <Controls />

    </ReactFlow>
   }
    <FixedPlugin
    // hasImage={hasImage}
    // setHasImage={() => setHasImage(!hasImage)}
    // color={color}
    // setColor={(color) => setColor(color)}
    // image={image}
    // setImage={(image) => setImage(image)}
    start = {startfilter}
    selectedstart= {selectedstart}
    setStart = {setSelectedstart}
    end = {endfilter}
    selectedend= {selectedend}
    setEnd = {setSelectedend}
    pathlenght = {pathlenght}
    setPathlenght = {setPathlenght}
    frequencie = {frequencie}
    setFrequencie = {setFrequencie}
    performance = {performance}
    setPerformance = {setPerformance}
    filternodes = {filternodes}
    setFilternodes = {setFilternodes}

  />

    </div>
  );
}

export default ProcessExplorer;


