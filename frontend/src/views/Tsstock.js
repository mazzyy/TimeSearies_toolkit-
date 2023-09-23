/* App.js */
import React, { Component ,useState} from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';
//var CanvasJSReact = require('@canvasjs/react-stockcharts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

 
class Tsstock extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints: [], isLoaded: false };
	
  }
  
 
  componentDidMount() {
    //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
    fetch("https://canvasjs.com/data/gallery/react/btcusd2017-18.json")
      .then(res => res.json())
      .then(
        (data) => {
          var dps = [];
          
          this.setState({
            isLoaded: true,
            dataPoints: dps
          });
        }
      )
  }
 
  render() {
    console.log('Parsed CSV Data:', this.props.data);

    let convertedData = [];
    if (this.props.data) {
      convertedData = this.props.data.slice(1).map(row => ({
        x: new Date(row.x),
        y: parseFloat(row.y)
      }));
      // console.log('Converted Data:', convertedData);
      this.state.dataPoints = convertedData;
      console.log('Data Points:', this.state.dataPoints);
    } else {
      // Handle the case where this.props.data is null or not available
    }

    const options = {
      title:{
        text:"Forecasting "
      },
      theme: "light2",
      subtitles: [{
        text: "time series Visualization"
      }],
      charts: [{
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM DD YYYY"
          }
        },
        axisY: {
          title: "Data Visualization",
          prefix: "",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "#,###.##"
          }
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Value",
          type: "scatter", // Use "scatter" type to display only data points without lines
          markerType: "circle", // Set the marker type to "circle"
          color: "#3576a8",
          yValueFormatString: "#,###.##",
          xValueFormatString: "MMM DD YYYY",
          dataPoints: this.state.dataPoints
		 
        }]
      }],
      navigator: {
        
      }
    };
    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto"
    };
	console.log('tsstock',this.state.dataPoints)
    return (
      <div> 
        <div>
          {
            // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
            this.state.isLoaded && 
            <CanvasJSStockChart containerProps={containerProps} options = {options}
              /* onRef = {ref => this.chart = ref} */
            />
          }
        </div>
      </div>
    );
  }
}
 
export default Tsstock;  