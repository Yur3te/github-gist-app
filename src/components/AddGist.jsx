import React, { useState } from "react";

export default function AddGist(props) {
  const firstFile = {name: "", content: ""}
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [files, setFiles] = useState([firstFile]);

  const [filename, setFilename] = useState("");
  const [content, setContent] = useState("");

  const descriptionHandler = (event) => setDescription(event.target.value);

  const isPublicHandler = (event) => setIsPublic(event.target.checked);

  const addFile = () => {
    setFiles((files) =>
      [...files].concat({ name: "", content: "" }));
      console.log("file added")
      console.log(files)
}

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
  
  const removeFile = (i) =>
        setFiles(files => files.filter((index) => index !== i))

  const create = (event) => {
    event.preventDefault();

    props.createWrapper(event);


    // let gistPayload = {
    //   description: description,
    //   public: isPublic,
    //   files: {
    //     [filename]: {
    //       content: content,
    //     },
    //   },
    // };

    // let files = {[filename]: {content:content}}
    // const wrapper = getWrapper();

    let filesObject = {}
    files.forEach((value) => {
        filesObject[value.name] = {content: value.content}
    })
    console.log("wysyłam: ",filesObject)

    props.wrapper
      .createGist(description, isPublic, filesObject)
      .then((response) => {
        // console.log(response.data);
        if (response.status === 201) {
          console.log("SUKCES!");
          setDescription("");
          setFiles([firstFile]);
          setIsPublic(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 244) {
          console.log("wpisz wszystko co potrzeba");
        }
        if (error.response.status === 401)
          console.log("coś jest nie tak z tokenem (from AddGist)");
        else console.log("coś innego poszło nie tak");
      });
  };

  return (
      <div>
        <div>Create new Gist!</div>
        {/* <form onSubmit={create}> */}
        <form>
          <div>
            {/* <label>Description: </label> */}
            <input
              type="text"
              placeholder={"description"}
              value={description}
              onChange={descriptionHandler}
            />
          </div>
          {/* <div>
            <label>Nazwa pliku: </label>
            <input
              type="text"
              placeholder={"filename"}
              value={filename}
              onChange={filenameHandler}
            />
          </div>
          <div>
            <label>Treść:</label>
            <input
              type="text"
              placeholder={"content of file"}
              value={content}
              onChange={contentHandler}
            />
          </div> */}

          {files.map((file, i) => {
            return(
            <div key={i}>
              <div>
                <input
                  type="text"
                  placeholder={"filename"}
                  value={file.name}
                  onChange={(event) => filenameHandler(event.target.value, i)}
                />
              </div>
              <div>
              <input
                  type="text"
                  placeholder={"content"}
                  value={file.content}
                  onChange={(event) => contentHandler(event.target.value, i)}
                />
              </div>
              {/* <button type={"button"} onClick={() => removeFile(i)}>Remove this file above^</button>
              potem się zrobi, ważne, że działa większość xd */}
            </div>
            )
          })}

          <button type="button" onClick={addFile}>Add file</button>

          <div>
            <label>Public? </label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={isPublicHandler}
            />
          </div>

          {/* <input type="submit" value="Wyślij" /> */}
          <button onClick={create}>Wyślij</button>
        </form>
      </div>
  );
}
