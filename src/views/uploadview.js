import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// react-bootstrap components
// import {Form} from "react-bootstrap";

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
    axios.post('http://127.0.0.1:5000/file-upload', formData).then(res => {
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
      {/* <Form.Group controlId="formFile" className="mb-3" onSubmit={onSubmit}>
        <Form.Label>Choose a File</Form.Label>
        <Form.Control type="file"  onChange={onChange} />
        <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form.Group> */}
      <form onSubmit={onSubmit}>
      <input type="file" onChange={onChange} />
      <button type="submit">Upload</button>
    </form>
    </>
  );
}

export default UploadView;




 

  

