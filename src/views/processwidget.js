import React, { useState, useCallback } from "react";
// import { useCallback } from 'react';

import {createGet,createPost} from "../api/apis.js";
import { SmartBezierEdge,SmartStepEdge } from '@tisoap/react-flow-smart-edge'

import { MarkerType } from 'reactflow';

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
  applyNodeChanges, 
  applyEdgeChanges
} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';
// import './flow.css';
import dagre from 'dagre';
import FixedPlugin from "../components/FixedPlugin/FixedPlugin.js";

const edgeTypes = {
	smart: SmartBezierEdge,
  smartstep:SmartStepEdge
}

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


const ProcessExplorerWidget=(resi)=>{
  const [fnodes, setNodes] = useState();
  const [fedges, setEdges] = useState();
  const [elements, setElements] = useState([]);

  
  const [loading , setLoading] = useState(false)
  const res = resi['res']


  

 




  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const updateNodeapi = () =>{
    setLoading(true);
    const res = resi['res']
    // console.log(res['dfg'][0]);
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
      node.sourcePosition = 'bottom';
  
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth,
        y: nodeWithPosition.y - nodeHeight,
      };
  
      return node;
    });
  
    setNodes(nodes)
    setEdges(edges)
    setElements([...nodes,...edges]);

  
    setLoading(false)

  }
  
  React.useEffect(() => {
  const res = resi['res']
  console.log('process effects',res['dfg'][0]);
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
  console.log('layout created')

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = 'top';
    node.sourcePosition = 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth/2,
      y: nodeWithPosition.y - nodeHeight/2,
    };

    return node;
  });

  setNodes(nodes)
  setEdges(edges)
  setElements([...nodes,...edges]);
    
  }, [resi]);

  const onElementClick = (event, object) => {
    const graphElements = [object.id];

      // setEdges((edges) =>
      //   edges.sort((a, b) => {
      //     if (a.source < b.source) return -1;
      //     if (a.source > b.source) return 1;
      //     return 0;
      //   })
      // );
      m = fedges.forEach((el) => {
        if (graphElements.includes(el.source)) {
          graphElements.push(el.target);
          el.animated = true;
        } else {
          el.animated = false;
        }
      console.log(m)
      setEdges(m)
      });
      return

  }

  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  


  return (
<ReactFlow
      nodes={fnodes}
      edges={fedges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onElementClick={onElementClick}
      onInit={onInit}
      edgeTypes={edgeTypes}
      fitView
      style={{"width":"100%","height":"500px","overflow":"scroll"}}
    >
    </ReactFlow>

  );
}

export default ProcessExplorerWidget;


