import React, { useState, useEffect } from "react";
import Gist from "./Gist";

export default function GistListing(props) {
  const [gists, setGists] = useState([]);
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

  // const getGistById = () => {
  //   if(props.tokenIsCorrect) {
  //     props.wrapper
  //     .getGist("566ec8baf88867d18caec0675d5ba221")
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  //   }
  // };

 

  useEffect(() => {
    getListOfGists();
    // getGistById()
  }, [props.tokenIsCorrect]);

  // useEffect(()=>{
  //   getListOfGists();
  //   setGistDeleted(false)
  // }, [gistDeleted])

  if (gists) {
    return (
      <div>
        <button type={"button"} onClick={getListOfGists}>
          Refresh List!
        </button>
        {gists.map((gist) => {
          return (
            <div key={gist.id}>
              <div>
                {gist.description}
                <Gist id={gist.id} wrapper={props.wrapper} tokenIsCorrect={props.tokenIsCorrect}/>
                <button type={"button"} onClick={() => deleteGist(gist.id)}>
                  ^^^Delete gist above^^^
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
