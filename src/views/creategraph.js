import React,{useRef} from 'react';
// import Plotly from 'plotly.js';

import Plotly from 'plotly.js/dist/plotly';








export const Creategraph = (props) => {
//   const { plotData } = props;

  const container = useRef(null);
  
  React.useLayoutEffect(() => {
      console.log(props.plotData)
    Plotly.newPlot(container.current, props.plotData.data, props.plotData.layout);
  }, [props.plotData.data, props.plotData.layout]);
    return <div ref={container} />;

//   React.useEffect(() => {
//     // parse the JSON data and render the Plotly graph
//     const fig = Plotly.react(div, );
//   }, [plotData]);

}


