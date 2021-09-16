import React, { useState, useEffect } from "react";
import Gist from "./Gist";

import "./../style/gistlisting.css";

export default function GistListing(props) {
  const [gists, setGists] = useState([]);


  const getListOfGists = () => {
    if (props.tokenIsCorrect) {
      props.wrapper
        .getAllGists()
        .then((response) => {
          setGists(response.data);
          console.log(response.data);
        })
        .catch(() => []);
    }
    console.log(gists.map((gist) => console.log(gist)));
  };


  useEffect(() => {
    getListOfGists();
  }, [props.tokenIsCorrect]);

  if (gists && props.tokenIsCorrect) {
    return (
      <div className="gistlisting">
        <button type={"button"} onClick={getListOfGists}>
          Refresh List!
        </button>
        {gists.map((gist) => {
          return (
            <div key={gist.id}>
              <div>
                <Gist setEditingId={props.setEditingId} id={gist.id} wrapper={props.wrapper} tokenIsCorrect={props.tokenIsCorrect}/>
              </div>
              <br/>
            </div>
          );
        })}
      </div>
    );
  } else return <div></div>
}