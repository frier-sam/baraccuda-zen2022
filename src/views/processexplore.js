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
    node.sourcePosition = 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  setNodes(nodes)
  setEdges(edges)
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

    </ReactFlow>}
      {/* <Container >
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Process Explorer</Card.Title>
              </Card.Header>
              <Card.Body>
               
              </Card.Body>
            </Card>
          </Col>
          <Col md="12" style={{ height: '100%' }}>
       
        </Col>
         
        </Row>
        
       
        
    
              
        
        
      </Container> */}
    </div>
  );
}

export default ProcessExplorer;

// function Flow() {
//   const reactFlowInstance = useReactFlow();
//   const setnodes = async () =>
//       {
//       var res = await createGet('getrenderdata');
      
      
//   }
//   setnodes().then((res)={
//     const { lnodes, ledges } = getLayoutedElements(
//     res['dfg'][0],
//     res['dfg'][1]
//   );
  
//   return lnodes,ledges}).then((lnodes,ledges) => {reactFlowInstance.setNodes(lnodes);
//     reactFlowInstance.setEdges(ledges);}).then

//   return (
//     <>
//       <ReactFlow
//         defaultNodes={initialNodes}
//         defaultEdges={initialEdges}
//         // defaultEdgeOptions={edgeOptions}
//         fitView
//         style={{
//           backgroundColor: '#D3D2E5',
//         }}
//         // connectionLineStyle={connectionLineStyle}
//       />
//       {/* <button onClick={onClick} className="btn-add">
//         add node
//       </button> */}
//     </>
//   );
// }

// export default function () {
//   return (
//     <ReactFlowProvider>
//       <Flow />
//     </ReactFlowProvider>
//   );
// }
