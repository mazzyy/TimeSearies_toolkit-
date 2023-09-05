/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

// Import necessary components from CanvasJSReact
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Initialize variables for timing
var startTime = 0, endTime = 0;

class Timeseries extends Component {
  componentDidMount() {
    // Record the end time of component rendering
    endTime = new Date();
    document.getElementById("timeToRender").innerHTML = "Time to Render: " + (endTime - startTime) + "ms";
	
  }

  render() {

    console.log('Parsed CSV Data---: csv ', this.props.data); // Accessing the 'limit' prop
    // Define parameters for generating random data
    var limit = 50000;
    var y = 100;
    var data = [];
    var dataSeries = { type: "line" };
    var dataPoints = [];

	if (this.props.data) {
		// Use map only if this.props.data is not null
		dataPoints=this.props.data.map(point => ({
		 x: new Date(parseFloat(point.x)), // Convert 'x' to a Date object
		y: parseFloat(point.y), // Parse 'y' as a floating-point number
		}));
	}


   
    

	console.log('datapoint',dataPoints)

	
    // Assign data points to the data series
    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);
	// console.log(data)

    // Define styling for the time-to-render display
    const spanStyle = {
      position: 'absolute',
      top: '10px',
      fontSize: '20px',
      fontWeight: 'bold',
      backgroundColor: '#d85757',
      padding: '0px 4px',
      color: '#ffffff'
    }

    // Configure chart options
    const options = {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: "Try Zooming - Panning"
      },
      data: data // random data
    }

    // Record the start time before rendering the chart
    startTime = new Date();

    return (
      <div>
        {/* Render the CanvasJSChart with specified options */}
        <CanvasJSChart options={options}
          onRef={ref => this.chart = ref}
        />
        {/* You can get a reference to the chart instance using onRef. This allows access to chart properties and methods */}
        <span id="timeToRender" style={spanStyle}></span>
      </div>
    );
  }
}

export default Timeseries;
