import React, { useState, useEffect } from "react";
import Gist from "./Gist";

import "./../style/gistlisting.css";

export default function GistListing(props) {
  const [gists, setGists] = useState([]);
  const [editingId, setEditingId] = useState()
  // const [gistDeleted, setGistDeleted] = useState(false)
  // const [files, setFiles] = useState([])

  const deleteGist = (id) => {
    props.wrapper.deleteGist(id).then((response) => {
      if (response.status === 204) {
        console.log("gist został usunięty", id);
        // setGistDeleted(true)
      } else console.log(response.setatus);
    });
  };

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

  // useEffect(()=>{
  //   getListOfGists();
  //   setGistDeleted(false)
  // }, [gistDeleted])

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
                {/* <button type="button" onClick={setEditingId(gist.id)}>Edit Gist</button> */}
                  {/* {editingId} */}
                <Gist setEditingId={props.setEditingId} id={gist.id} wrapper={props.wrapper} tokenIsCorrect={props.tokenIsCorrect}/>
                <button type={"button"} onClick={() => deleteGist(gist.id)}>
                  ^^^Delete gist above^^^
                </button>
              </div>
              <br/>
            </div>
          );
        })}
      </div>
    );
  } else return <div></div>
}
