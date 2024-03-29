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
import './flow.css';
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


function ProcessExplorer() {
  const [fnodes, setNodes] = useState();
  const [fedges, setEdges] = useState();
  const [elements, setElements] = useState([]);

  const [startfilter, setStartfilter] = useState([]);
  const [endfilter , setEndfilter] = useState([]);

  const [selectedstart, setSelectedstart] = useState();
  const [selectedend, setSelectedend] = useState([]);
  const [pathlenght , setPathlenght] = useState(0);
  const [loading , setLoading] = useState(false)
 

  const [filterstate, setFilterstate] = useState({
    'act_perc':0.7,
    'path_perc':0.5,
    'view_type':'act_cnt',
    'unit':'hours',
    'endnode':[],
    'view_type':'act_cnt'
 
  });

  const handlefilterlistChange = (event) => {
    // setFilterstate((prevState) => ({
    //   ...prevState,
    //   [event.target.name]: event.target.selectedOptions,
    // }));
    console.log(event.target.selectedOptions);
    var selectedItems = event.target.selectedOptions;
    const flavors = [];
        for (let i=0; i<selectedItems.length; i++) {
            flavors.push(selectedItems[i].value);
        }
    console.log(flavors);
    setFilterstate((prevState) => ({
        ...prevState,
        [event.target.name]: flavors,
      }));
  }

  const handlefilterChange = (event) => {
    setFilterstate((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }


  const getnodes = async (data) =>
    {
    var res = await createPost('getrenderdata',data);
    return res
  }

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
    getnodes(filterstate).then((res)=>{
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
        x: nodeWithPosition.x - nodeWidth,
        y: nodeWithPosition.y - nodeHeight,
      };
  
      return node;
    });
  
    setNodes(nodes)
    setEdges(edges)
    setElements([...nodes,...edges]);
    var startlist = Object.keys(res['start']).map((key) => [key, res['start'][key]]);
    var endlist = Object.keys(res['end']).map((key) => [key, res['end'][key]]);
  
    setStartfilter(startlist)
    setEndfilter(endlist)
    setLoading(false)
    }).then(()=>
    {console.log('fnodes',fnodes);
      console.log('fedges',fedges);}
    )
  }
  
  React.useEffect(() => {

  getnodes(filterstate).then((res)=>{
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
      x: nodeWithPosition.x - nodeWidth/2,
      y: nodeWithPosition.y - nodeHeight/2,
    };

    return node;
  });

  setNodes(nodes)
  setEdges(edges)
  // setElements([...nodes,...edges]);
  var startlist = Object.keys(res['start']).map((key) => [key, res['start'][key]]);
  var endlist = Object.keys(res['end']).map((key) => [key, res['end'][key]]);

  setStartfilter(startlist)
  setEndfilter(endlist)
  }).then(()=>
  {console.log('fnodes',fnodes);
    console.log('fedges',fedges);}
  )

    
  }, []);

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
    <div >

    {<ReactFlow
      nodes={fnodes}
      edges={fedges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onElementClick={onElementClick}
      onInit={onInit}
      edgeTypes={edgeTypes}
      fitView
    >
      <MiniMap />
      <Controls />

    </ReactFlow>
   }
    <FixedPlugin
    loading = {loading}
    start = {startfilter}
    selectedstart= {selectedstart}
    setStart = {setSelectedstart}
    end = {endfilter}
    selectedend= {selectedend}
    setEnd = {handlefilterlistChange}
    pathlenght = {pathlenght}
    setPathlenght = {setPathlenght}
    
    filterstate = {filterstate}
    handlefilterChange = {handlefilterChange}
    updatenode = {updateNodeapi}

  />

    </div>
  );
}

export default ProcessExplorer;


