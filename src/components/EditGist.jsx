import React, { useState, useEffect } from "react";

import "./../style/editgist.css";

export default function EditGist(props) {
  const [files, setFiles] = useState();
  const [description, setDescription] = useState("");
  const [filesBeforeUpdate, setFilesBeforeUpdate] = useState();

  const descriptionHandler = (event) => setDescription(event.target.value);

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
    setFiles((files) =>
      [...files].concat({ name: "", content: "", deleted: false })
    );
    console.log("file added");
    console.log(files);
  };

  const removeFile = (i) =>
    setFiles((files) =>
      files.map((item, index) =>
        index === i ? { ...item, deleted: true } : item
      )
    );

  useEffect(() => {
    if (props.editingId) {
      props.wrapper.getGist(props.editingId).then((response) => {
        const files = [];
        Object.keys(response.data.files).forEach((key) => {
          files.push({
            name: response.data.files[key].filename,
            content: response.data.files[key].content,
          });

          setDescription(response.data.description);
          setFiles(files);
          setFilesBeforeUpdate(files);
        });
      });
    }
  }, [props.editingId, props.wrapper]);

  const update = (event) => {
    event.preventDefault();
    console.log(files);

    let sendableFiles = {};
    files.forEach((file, i) => {
      if (file.deleted) {
        if (i < filesBeforeUpdate.length)
          sendableFiles[file.name] = { content: "" };
      } else {
        if (i < filesBeforeUpdate.length)
          sendableFiles[filesBeforeUpdate[i].name] = {
            content: file.content,
            filename: file.name,
          };
      else
        sendableFiles[file.name] = {
          content: file.content,
          filename: file.name,
        };
      }
    });

    console.log("Sending: ", sendableFiles);

    props.wrapper
      .updateGist(props.editingId, description, sendableFiles)
      .then((response) => {
        if (response.status === 200) {
          console.log("Sukces! Gist has been updated");
          setFiles("");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Ups, something went wrong");
      });
  };

  if (files) {
    return (
      <div className="editgist">
        {props.editingId}
        <button onClick={() => setFiles("")}>Cancel Edit</button>
        <form onSubmit={update}>
          <div>
            <input
              type="text"
              placeholder={"description"}
              value={description}
              onChange={descriptionHandler}/>

          </div>

          {files.map((file, i) => {
            return (
              <div key={i}>
                {!file.deleted && <>
                                
                    <div>
                      File number {i + 1}
                      <button
                        className="removefile"
                        type={"button"}
                        onClick={() => removeFile(i)}
                      >X</button>
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
                    </>
                    }
              </div>
            );
          })}
          <button className="addfile" type="button" onClick={addFile}>
            Add New file
          </button>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  } else return <div></div>;
}