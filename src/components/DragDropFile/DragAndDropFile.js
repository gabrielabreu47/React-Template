import React, { useState, useRef, useEffect } from "react";
import "./DragAndDropFile.css";

const DragAndDropFile = (props) => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [validFiles, setValidFiles] = useState([]);
  const fileInputRef = useRef();
  useEffect(() => {
    let filteredArray = selectedFiles.reduce((files, current) => {
      const currentFile = files?.find(file => file.name === current.name);
      if (!currentFile) {
        return files?.concat([current]);
      } else {
        return files;
      }
    }, []);

    props.onFileUpload(filteredArray);

    setValidFiles([...filteredArray]);

  }, [selectedFiles]);

  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles(prevArray => [...prevArray, files[i]]);

      } else {
        files[i]["invalid"] = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage("File type not permitted");
      }
    }
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const validateFile = (file) => {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/x-icon',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };
  const fileSize = (size) => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const fileType = (fileName) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
  };

  const removeFile = (name) => {
    const validFileIndex = validFiles.findIndex(e => e.name === name);

    validFiles.splice(validFileIndex, 1);

    setValidFiles([...validFiles]);

    const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);

    setSelectedFiles([...selectedFiles]);
  };
  return (
    <div>
      <div className="content">

        <div className="container">
          <div
            className="drop-container"
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
            onClick={fileInputClicked}
          >
            <input
              ref={fileInputRef}
              className="file-input"
              type="file"
              multiple
              onChange={filesSelected}
            />
            <div className="drop-message">
              <div className="upload-icon"></div>
          Arrastra & suelta archivos aquí o haz clic para subir
          </div>
          </div>
          <div className="file-display-container">
            {
              selectedFiles.map((data, i) =>
                <div className="file-status-bar border-box" key={i} >
                  <div >
                    <div className="file-type-logo"></div>
                    <div className="file-type">{fileType(data.name)}</div>
                    <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                    <span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                  </div>
                  <div className="file-remove border-box" onClick={() => removeFile(data.name)}>X</div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDropFile;
