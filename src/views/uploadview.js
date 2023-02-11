import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {baseURL} from '../api/apis';
// react-bootstrap components
// import {Form} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { BsUpload,BsBezier2,BsFillCloudUploadFill,BsFillFileEarmarkRuledFill,BsSliders } from "react-icons/bs"
import {

  Row,
  Col

} from "react-bootstrap";


function UploadView() {
  // const [imageURL, setimageURL] = useState('');
  const history = useHistory();

  const [file, setFile] = useState(null);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    axios.post(baseURL +'file-upload', formData).then(res => {
      console.log(res.data);
      history.push('/admin/processminining')
      // navigate("processminining", { replace: true });
    });
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }
 
  return (
    <>
      <Row>
        <Col size={4}>
          <Card>
            <div className="text-center mt-1"><BsUpload  size={70} /></div>
            <Card.Body>
              <Card.Title className="text-center"><strong>Upload</strong></Card.Title>
              <hr/>
              <form onSubmit={onSubmit}>
                <input type="file" onChange={onChange} />
                <hr/>
                <div className="text-center">
                  {/* <button type="submit">Upload</button> */}
                  <Button variant="primary" type="submit">Upload</Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
        <Col size={4}>
          <Card>
            <div className="text-center mt-1"><BsBezier2  size={70} /></div>
            <Card.Body>
              <Card.Title className="text-center"><strong>Database Connect</strong></Card.Title>
              <hr/>
              <Card.Text>
                Connect with any relational database to start the analysis process
              </Card.Text>
              <div className="text-center"><Button variant="primary">Connect</Button></div>
            </Card.Body>
          </Card>
        </Col>
        <Col size={4}>
          <Card>
            <div className="text-center  mt-1"><BsFillCloudUploadFill  size={70} /></div>
            <Card.Body>
              <Card.Title className="text-center"><strong>Cloud Connect</strong></Card.Title>
              <hr/>
              <Card.Text>
                Connect with clound instances for logs and timeseries data.
              </Card.Text>
              <div className="text-center"><Button variant="primary">Connect</Button></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col size={4}>
          <Card>
            <div className="text-center mt-2"><BsFillFileEarmarkRuledFill  size={70} /></div>
            <Card.Body>
              <Card.Title className="text-center"><strong>Sales Force</strong></Card.Title>
              <hr/>
              <Card.Text>
                Connect with sales force
              </Card.Text>
              <div className="text-center"><Button variant="primary">Connect</Button></div>
            </Card.Body>
          </Card>
        </Col>
        <Col size={6}>
          <Card>
            <div className="text-center"><BsSliders  size={70} /></div>
            <Card.Body>
              <Card.Title className="text-center"><strong>Api Integration</strong></Card.Title>
              <hr/>
              <Card.Text>
                Connect with any custome api for live data view.
              </Card.Text>
              <div className="text-center"><Button variant="primary">Connect</Button></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      
      
    </>
  );
}

export default UploadView;




 

  

