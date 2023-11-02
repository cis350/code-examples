import React, { useState } from 'react';
import uploadFile from './api/upload';


const App = function () {
  const [files, setFiles] = useState([]);

  // event handler for file selection
  const updateFile = (evt) => {
    setFiles([...evt.target.files]);
  };

  // event handler for files upload
  const handleUpload = async () => {
    // create new formdata object
    const formData = new FormData();

    // Add files to the formdata object
    //to add more than one file add the 
    // "multiple" prop to the input element
    for (let i = 0; i < files.length; i += 1) {
      formData.append(`File_${i}`, files[i]);
    }
    // upload the file
    uploadFile(formData);
  };

  return (
    <div>
      <h2>File Upload Example</h2>
      <div>
        File:
        <input
          id="upld"
          type="file"
          name="someFiles"
          onChange={(e) => updateFile(e)}
        />
      </div>
      <div>{files.length} file(s) selected</div>
      <button type="submit" onClick={() => handleUpload()}>
        Upload Files
      </button>
    </div>
  );
};
export default App;