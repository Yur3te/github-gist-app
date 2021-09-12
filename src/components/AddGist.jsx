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

  // const createTestingGists = (event) => {
  //   event.preventDefault();

  //   let filesPayload = {
  //       "hello_world.rb": {
  //         content:
  //           'class HelloWorld\n   def initialize(name)\n      @name = name.capitalize\n   end\n   def sayHi\n      puts "Hello !"\n   end\nend\n\nhello = HelloWorld.new("World")\nhello.sayHi',
  //       },
  //       "hello_world.py": {
  //         content:
  //           'class HelloWorld:\n\n    def __init__(self, name):\n        self.name = name.capitalize()\n       \n    def sayHi(self):\n        print "Hello " + self.name + "!"\n\nhello = HelloWorld("world")\nhello.sayHi()',
  //       },
  //       "hello_world_ruby.txt": {
  //         content: "Run `ruby hello_world.rb` to print Hello World",
  //       },
  //       "hello_world_python.txt": {
  //         content: "Run `python hello_world.py` to print Hello World",
  //       },
  //   };
    
  //   for(let i = 0; i<5; i++){
  //   props.wrapper
  //     .createGist(`gist number ${i+1}`, false, filesPayload)
  //     .then((response) => console.log(response));
  //   }
  // };

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
        {/* <button onClick={createTestingGists}>Create 5 gists for testing!</button> */}
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
                {/* <button type={"button"} onClick={() => removeFile(i)}>
                  ⇈Remove file {i + 1}⇈
                </button> */}
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
