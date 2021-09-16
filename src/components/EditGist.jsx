import React, { useState, useEffect } from "react";

import "./../style/editgist.css";

export default function EditGist(props) {
  const [files, setFiles] = useState();
  const [description, setDescription] = useState("");
  const [filesBeforeUpdate, setFilesBeforeUpdate] = useState();

  const descriptionHandler = (event) => setDescription(event.target.value);

  //   const isPublicHandler = (event) => setIsPublic(event.target.checked);

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

  useEffect(() => {
    if (props.editingId) {
      props.wrapper.getGist(props.editingId).then((response) => {
        // console.log(response.data.files);
        const files = [];
        Object.keys(response.data.files).forEach((key) => {
          files.push({
            name: response.data.files[key].filename,
            content: response.data.files[key].content,
          });

          // console.log(files)
          setDescription(response.data.description);
          setFiles(files);
          setFilesBeforeUpdate(files);
        });
        // console.log(gist.files)
      });
    }
  }, [props.editingId, props.wrapper]);

  const update = (event) => {
    event.preventDefault();
    console.log(files)

    let sendableFiles = {};
    files.forEach((value) => {
      sendableFiles[value.name] = { content: value.content, filename: value.name };
    });
    console.log("wysyłam: ", sendableFiles);

    props.wrapper
      .updateGist(props.editingId, description, sendableFiles)
      .then((response) => {
        if (response.status === 200) {
          console.log("Sukces! Gist has been updated");
          setDescription("");
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
        <button onClick={() => props.setEditingId("")}>Cancel Edit</button>
        <form onSubmit={update}>
          <div>
            <input
              type="text"
              placeholder={"description"}
              value={description}
              onChange={descriptionHandler}
            />
          </div>
          {/* {console.log(files)} */}
          {files.map((file, i) => {
            return (
              <div key={i}>
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
