import React, { useState, useEffect } from "react";

export default function GistListing(props) {
  const [gists, setGists] = useState([]);
  // const [gistDeleted, setGistDeleted] = useState(false)

  const deleteGist = (id) => {
    props.wrapper.deleteGist(id).then((response) => {
      if (response.status === 204) {
        console.log("gist został usunięty", id);
        // setGistDeleted(true)
      } else console.log(response.setatus);
    });
  };

  const getListOfGists =  () => {
     props.wrapper
    .getAllGists()
    .then((response) => {
      setGists(response.data);
    })
    .catch(() => [])
    // console.log(gists.map((gist) => console.log(gist)));
  };

  useEffect(() => {
    getListOfGists();
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
              <div>{gist.description}</div>
              <button type={"button"} onClick={() => deleteGist(gist.id)}>
                Remove gist
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
