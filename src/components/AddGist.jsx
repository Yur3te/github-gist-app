import React, { useState } from "react";

import "./../style/addgist.css";

export default function AddGist(props) {
  const firstFile = { name: "", content: "" };
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [files, setFiles] = useState([firstFile]);

  const descriptionHandler = (event) => setDescription(event.target.value);

  const isPublicHandler = (event) => setIsPublic(event.target.checked);

  const filenameHandler = (value, i) => {
    setFiles((files) =>
      files.map((item, index) =>
        index === i ? { ...item, name: value } : item
      )
    );
  };

  const contentHandler = (value, i) => {
    setFiles((files) =>
      files.map((item, index) =>
        index === i ? { ...item, content: value } : item
      )
    );
  };

  const addFile = () => {
    setFiles((files) => [...files].concat({ name: "", content: "" }));
    console.log("file added");
    console.log(files);
  };

  const removeFile = (i) =>
    setFiles((files) => files.filter((value, index) => index !== i));


  const create = (event) => {
    event.preventDefault();

    props.createWrapper(event);

    let sendableFiles = {};
    files.forEach((value) => {
      sendableFiles[value.name] = { content: value.content };
    });
    console.log("Sending: ", sendableFiles);

    props.wrapper
      .createGist(description, isPublic, sendableFiles)
      .then((response) => {
        if (response.status === 201) {
          console.log("Sukces! Gist został wysłany");
          setDescription("");
          setFiles([firstFile]);
          setIsPublic(false);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Ups, something went wrong");
      });
  };

  if(props.tokenIsCorrect) {
    return (
      <div className="addgist">
        <form onSubmit={create}> 
            <label>Create new Gist!</label>
          <div>
            <input
              type="text"
              placeholder={"description"}
              value={description}
              onChange={descriptionHandler}
            />
          </div>
          {files.map((file, i) => {
            return (
              <div key={i}>
                <div>
                  File number {i + 1} 
                  <button className="removefile" type={"button"} onClick={() => removeFile(i)}>X</button>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder={"filename"}
                    value={file.name}
                    onChange={(event) => filenameHandler(event.target.value, i)}
                  />
                </div>
                <div>
                  <textarea
                    type="text"
                    placeholder={"content"}
                    value={file.content}
                    onChange={(event) => contentHandler(event.target.value, i)}
                  />
                </div>
              </div>
            );
          })}

          <button className="addfile" type="button" onClick={addFile}>
            Add New file
          </button>

          <div>
            <label>Send as Public? </label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={isPublicHandler}
            />
          </div>

          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
  )}else return <div></div>
}