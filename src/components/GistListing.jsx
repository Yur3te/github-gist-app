import React, { useState } from "react";

import gistsWrapper from "../js/gistsWrapper";
const token = require("../js/config.js");




export default function GistListing() {
  const [gists, setGists] = useState([]);

  const getWrapper = function () {
    const wrapper = new gistsWrapper(token);
    return wrapper;
  };

  const getListOfGists = () => {
    const wrapper = getWrapper();
    const res = wrapper
      .getAllGists()
      .then((response) => response.data)
      .catch(() => []);
    setGists(res);
    console.log(gists);
  };

  return (
    <div>
      <button onClick={getListOfGists}>Get all new gists!</button>
    </div>
  );
}
