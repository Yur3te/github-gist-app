import React, { useState } from "react";


export default function GistListing(props) {
  const [gists, setGists] = useState([]);
  
  const getListOfGists = () => {
    props.wrapper
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
         <div value={gist.files} key={gist.id} />;
      })}
    </div>
  );
}
