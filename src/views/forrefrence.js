const getLayoutedElements = async (nodes, edges, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
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
      node.targetPosition = isHorizontal ? 'left' : 'top';
      node.sourcePosition = isHorizontal ? 'right' : 'bottom';
  
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
  
      return node;
    });
  
    return { nodes, edges };
  };
  

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



<Dropdown>
        <Dropdown.Toggle
          id="dropdown-fixed-plugin"
          variant=""
          className="text-white border-0 opacity-100"
        >
          <i className="fas fa-cogs fa-2x mt-1"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <li className="adjustments-line d-flex align-items-center justify-content-between">
            <p>Background Image</p>
            <Form.Check
              type="switch"
              id="custom-switch-1-image"
              checked={hasImage}
              onChange={setHasImage}
            />
          </li>
          <li className="adjustments-line mt-3">
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
          <li className="button-container mb-4">
            <Button
              className="btn-social btn-outline btn-round sharrre"
              id="twitter"
              variant="twitter"
            >
              <i className="fab fa-twitter"></i>· 256
            </Button>
            <Button
              className="btn-social btn-outline btn-round sharrre"
              id="facebook"
              variant="facebook"
            >
              <i className="fab fa-facebook-square"></i>· 426
            </Button>
          </li>
        </Dropdown.Menu>
      </Dropdown>