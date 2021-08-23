import React, { useState } from "react";

// import gistsWrapper from "../js/gistsWrapper";

export default function AddGist(props) {
  // const getWrapper = function () {
  //   const wrapper = new gistsWrapper(props.token);
  //   return wrapper;
  // };

  const [description, setDescription] = useState("");
  const [filename, setFilename] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const descriptionHandler = (event) => setDescription(event.target.value);

  const filenameHandler = (event) => setFilename(event.target.value);

  const contentHandler = (event) => setContent(event.target.value);

  const isPublicHandler = (event) => setIsPublic(event.target.checked);


  
  const create = () => {

    let gistPayload = {
      description: description,
      public: isPublic,
      files: {
        [filename]: {
          content: content,
        },
      },
    };
    // const wrapper = getWrapper();

    props.wrapper
      .createGist(gistPayload)
      .then((response) => {
        // console.log(response.data);
        if (response.status === 201) {
          console.log("SUKCES!");
          setDescription("");
          setFilename("");
          setContent("");
          setIsPublic(false);
        }
      })
      .catch((error) => {
        console.log(error);
        // console.log("coś poszło nie tak");
        if (error.response.status === 244) {
          console.log("wpisz wszystko co potrzeba");
        }
        if (error.response.status === 401)
          console.log("coś jest nie tak z tokenem");
      });
  };

  return (

    <div>
      <div>
        <div>
          Create new Gist!
        </div>
        <form onSubmit={create}>
          <div>
            <label>Opis: </label>
            <input
              type="text"
              value={description}
              onChange={descriptionHandler}
            />
          </div>
          <div>
            <label>Nazwa pliku: </label>
            <input type="text" value={filename} onChange={filenameHandler} />
          </div>
          <div>
            <label>Treść:</label>
            <input type="text" value={content} onChange={contentHandler} />
          </div>
          <div>
            <label>Wysłać jako Publiczne? </label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={isPublicHandler}
            />
          </div>
          <input type="submit" value="Wyślij" />
        </form>
      </div>
    </div>
  );
}