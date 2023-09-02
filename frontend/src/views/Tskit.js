import React, { useState } from "react";
import Papa from 'papaparse';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Table,
  Button
} from "react-bootstrap";
import axios from "axios";
// import { Button } from "antd";
import ChartistGraph from "react-chartist";
import Plot from 'react-plotly.js';


import "assets/css/index.css";
const Tskit = () => {
  const [csvData, setCsvData] = useState(null); // State to store parsed CSV data
  const [csvArray, setcsvArray] = useState([]);
  const [csvTime, setCsvTime] = useState([]);

   const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          console.log('Parsed CSV Data:', result.data);
          setCsvData(result.data);
         // Extract values from the first column as y and create the array
          const extractedValues = result.data.map(row => row[Object.keys(row)[1]]);

          const csvTimeData = result.data.map(row => row[Object.keys(row)[0]]);
          
          setcsvArray(extractedValues);
          setCsvTime(csvTimeData);
          console.log('Values Array:', extractedValues);
         
        },
        header: true,
      });
    }
  };
const dummy = {data: [[1,2,3],[4,5,6]]}
  const handleSubmit = () => {
    const url = "http://127.0.0.1:8000/test2";
    axios
      .post(url, {
        data: csvData,
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((response) => {
        // Handle the response as needed
        console.log("Response:", response);

        // Update the state to hide the submit link and show the new link
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error:", error);
      });
  };
  React.useEffect(() => {
    console.log('Parsed CSV Data: csv ', csvData);
    console.log('Csv Array:', csvArray);
    console.log('Csv Time:', csvTime);
  }, [csvData,csvArray,csvTime]);

  const plotData = [
    {
      x: csvTime,
      y: csvArray,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue' }, // Customize marker color
      line: { shape: 'linear' }, // Use a linear line shape
    },
  ];
  const layout = {
    title: 'Line Plot with Time on X-axis',
    xaxis: { title: 'Time' },
    yaxis: { title: 'Integers' },
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Upload Data in CSV </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1 " md="12">
                      <Form className="my-5">
                        <Form.Group>
                          <Form.Label>Name for project</Form.Label>
                          <Form.Control
                            placeholder="Name"
                            type="text"
                            value='123'
                            // onChange={handleNameChange}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Upload File</Form.Label>
                          <Form.Control
                            type="file"
                            className="custom-file-upload "
                            onChange={handleFileChange} // Handle file change
                          />
                        </Form.Group>
                        <>default train test is 70:30</>
                        <br></br>
                        <div> select model lstm or Prophet</div>
                        <br></br>
                        <Button
                          className="btn-fill pull-right mt-5 btn-primary"
                          type="submit"
                          variant="info"
                          onClick={(e) => {
                            handleSubmit();
                            e.preventDefault();
                          }}                        >
                          upload file
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                  </Row>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()} >
                    <span
                      className="avatar border-gray"
                    ></span>
                    <br/><br/><br/><br/><br/>
                    <h5 className="title">Tips</h5>
                  </a>
                </div>
                <p className="description text-center">
                The data should consist of columns/features with time, and it should only have two columns: 'x' representing time and 'y' representing prediction values.
                </p>
              </Card.Body>
              {/* <>This is the data</>
              <div> {JSON.stringify(csvData)}</div> */}
              <hr></hr>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md='4'>
          <Card className="trpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">5 Rows Head Data</Card.Title>
                <p className="card-category">
                 
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
              
            
              
              {csvData && csvData.length > 0 && (
      <Table className="table-hover">
                 <table>
          <thead>
            <tr>
              <th>Row Index</th>
              <th>Time</th>
              <th>Value</th>

            </tr>
          </thead>
          <tbody>
            {csvData.slice(0, 5).map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  <td>{rowIndex}</td>
                  <td>{row[Object.keys(row)[0]]}</td>
                  <td>{row[Object.keys(row)[1]]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </Table>
      )}
              </Card.Body>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Prediciton Grapgh </Card.Title>
                <p className="card-category">Time durantion for 2023</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">

                <Plot data={plotData} layout={layout}  />
                  {/* <ChartistGraph
                    data={{
                      labels: csvTime,
                    
                      series: [
                        // csvArray
                        csvArray
                        
                      ],
                    }}
                    type="Line"
                    options={{
                      low: minValue,
                      high: maxValue,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  /> */}
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Tskit;
