import React, { useState, useRef } from "react";

import gistsWrapper from "../js/gistsWrapper";
const token = require("../js/config.js");

export default function AddGist() {
  const getWrapper = function () {
    const wrapper = new gistsWrapper(token);
    return wrapper;
  };

  const fileNameRef = useRef();

  const create = (event) => {
    const enteredFileName = fileNameRef.current.value;
    event.preventDefault();

    const file = { name: enteredFileName, content: "test" };

    let gistPayload = {
      description: "opis",
      public: true,
      files: { file },
    };

    const wrapper = getWrapper();
    wrapper
      .createGist(gistPayload)
      .then((response) => console.log(response.data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={create}>
          <div>
            <label>Nazwa pliku:</label>
            <input type="text" ref={fileNameRef} />
          </div>
          <div>
            <label>Treść:</label>
            <input type="text" />
          </div>
          <input type="submit" value="Wyślij" />
        </form>
      </div>
    </div>
  );
}
