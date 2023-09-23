import React, { useState } from "react";
import Papa from 'papaparse';
import Tsstock from "./Tsstock";
import Tsstock2 from "./Tsstock2";
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


const Upload = () => {
  const [csvData, setCsvData] = useState(null); // State to store parsed CSV data

  const [iframeKey, setIframeKey] = useState(0);

  
  let data=[]

   const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          console.log('Parsed CSV Data:', result.data);
    
          // Convert 'x' column values to date objects and 'y' column values to floats
          // const convertedData = result.data.slice(1).map(row => ({
          //   x: new Date(row.x),
          //   y: parseFloat(row.y)
          // }));
         
          // You can now use 'convertedData' which contains the desired data format
         
          // console.log('Converted Data:', result.data);
          setCsvData(result.data)
          
        },
        header: true,
      });
    
    }
    
  };

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
        setIframeKey((prevKey) => prevKey + 1);
        // Update the state to hide the submit link and show the new link
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error:", error);
      });
  };
  React.useEffect(() => {

  }, [csvData]);


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
                Api for your data in json format
                <br></br>
              
                <a href="http://127.0.0.1:8000/test2">http://127.0.0.1:8000/test2</a>
                
              </Card.Body>
              {/* <>This is the data</>
              <div> {JSON.stringify(csvData)}</div> */}
              <hr></hr>
            </Card>
          </Col>
        </Row>
     <Row>
     <iframe
        key={iframeKey} // This key will force a re-render of the iframe when it changes
        src="http://localhost:8501/#line-chart" // Replace with the URL you want to embed
        width="100%" // Set the width to 100% to make it responsive
        height="700" // Set the desired height
        title="Embedded Content" // Add a title for accessibility
        style={{ border: 'none' }} // Optional: Remove iframe border
      >
        Your browser does not support iframes.
      </iframe>
      </Row>
      </Container>
    </>
  );
}

export default Upload;
