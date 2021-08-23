import React, { useState } from "react";

import gistsWrapper from "../js/gistsWrapper";

export default function GistListing(props) {
  const [gists, setGists] = useState([]);

  const getWrapper = function () {
    const wrapper = new gistsWrapper(props.token);
    return wrapper;
  };

  const getListOfGists = () => {
    const wrapper = getWrapper();
    // const res =
    wrapper
      .getAllGists()
      .then((response) => setGists(response.data))
      // .catch(() => []);
    // setGists(res);
    // console.log(gists)
    console.log(gists.map((gist) => console.log(gist)));
  };
  // const downloadedGists = () => {
  //   gists.map((gist) => {
  //     return <div url={gist.html_url} key={gist.id} />;
  //   });
  // };

  return (
    <div>
      {/* {gists.map((gist) => {
        return <div key={gist}></div>;
      })} */}
      <button onClick={getListOfGists}>Get all new gists!</button>
      {gists.map((gist) => {
        return <div url={gist.html_url} key={gist.id} />;
      })}
    </div>
  );
}
