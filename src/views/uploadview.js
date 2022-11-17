import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// react-bootstrap components
// import {Form} from "react-bootstrap";

function UploadView() {
  // const [imageURL, setimageURL] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const handleUploadImage = (ev) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append("selectedFile", selectedFile);

    // try {
    //   const response = await axios({
    //     method: "post",
    //     url: "localhost:8000/upload",
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    // }.catch(error) {
    //   console.log(error)
    // }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }
 
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3" onSubmit={handleUploadImage}>
        <Form.Label>Choose a File</Form.Label>
        <Form.Control type="file"onChange={handleFileSelect} />
        <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form.Group>
    </>
  );
}

export default UploadView;
