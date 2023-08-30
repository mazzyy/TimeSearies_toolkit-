import React, { useState } from "react";
import 'assets/css/index.css';
import Papa from 'papaparse';
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

function Tskit() {

  const [csvData, setCsvData] = useState(null); // State to store parsed CSV data

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Use PapaParse to parse the CSV data
      Papa.parse(file, {
        complete: (result) => {
          console.log('Parsed CSV Data:', result.data); // Print parsed CSV data
          setCsvData(result.data); // Store the parsed data in state
        },
        header: true, // Assuming the first row is headers
      });
    }
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
                  <Button
                    className="btn-fill pull-right mt-5"
                    type="submit"
                    variant="info"
                    onClick={(e) => e.preventDefault()} 
                  >
                  Save and upload
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
                The data should consists of columns/features with time, and it should only have two columns: 'x' representing time and 'y' representing prediction values.
                </p>
              </Card.Body>
              {/* <>This is the data</>
              <div> {JSON.stringify(csvData)}</div> */}
              <hr></hr>


            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Tskit;
