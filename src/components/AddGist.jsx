import React, { useState } from "react";

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
    console.log("wysyłam: ", sendableFiles);

    props.wrapper
      .createGist(description, isPublic, sendableFiles)
      .then((response) => {
        if (response.status === 201) {
          console.log("SUKCES!");
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

  return (
    <div>
      <div>Create new Gist!</div>
      <form onSubmit={create}>
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
              <div>File number {i + 1}</div>
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
              <button type={"button"} onClick={() => removeFile(i)}>
                ⇈Remove file {i + 1}⇈
              </button>
            </div>
          );
        })}

        <button type="button" onClick={addFile}>
          Add file
        </button>

        <div>
          <label>Public? </label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={isPublicHandler}
          />
        </div>

        <input type="submit" value="Wyślij" />
      </form>
    </div>
  );
}
