import React, { useState } from "react";

import gistsWrapper from "../js/gistsWrapper";
const token = require("../js/config.js");

export default function AddGist() {
  const getWrapper = function () {
    const wrapper = new gistsWrapper(token);
    return wrapper;
  };

  const [description, setDescription] = useState("");
  const [filename, setFilename] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const descriptionHandler = (event) => setDescription(event.target.value);

  const filenameHandler = (event) => setFilename(event.target.value);

  const contentHandler = (event) => setContent(event.target.value);

  const isPublicHandler = (event) => setIsPublic(event.target.checked);

  const create = (event) => {
    event.preventDefault();

    let gistPayload = {
      description: description,
      public: isPublic,
      files: {
        [filename]: {
          content: content,
        },
      },
    };

    const wrapper = getWrapper();
    wrapper
      .createGist(gistPayload)
      .then((response) => console.log(response.data))
      .catch((err) => {
        console.log(err);
      });

    // dodać ifa - jeżeli jest response, że się udało to dopiero wtedy

    setDescription("");
    setFilename("");
    setContent("");
    setIsPublic(false)
  };

  return (
    <div>
      <div>
        <form onSubmit={create}>
          <div>
            <label>Opis: </label>
            <input type="text" value={description} onChange={descriptionHandler} />
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
            <label>Publiczne? </label>
            <input type="checkbox" checked={isPublic} onChange={isPublicHandler} />
          </div>
          <input type="submit" value="Wyślij" />
        </form>
      </div>
    </div>
  );
}