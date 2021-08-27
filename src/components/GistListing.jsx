import React, { useState, useEffect } from "react";


export default function GistListing(props) {
  const [gists, setGists] = useState([]);



  const deleteGist = (id) => {
    props.wrapper.deleteGist(id)
    .then(response => {
      console.log(response.setatus)
        // if (response.status === 204) {
        //     console.log("gist został usunięty", id)
        // }
    })
}

  
  const getListOfGists = () => {
    props.wrapper
      .getAllGists()
      .then((response) => {
        setGists(response.data)
      })
      .catch(() => [])
      
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

  useEffect(()=> {
    getListOfGists()
  }, []) 

  // useEffect(()=> {
  //   console.log(gists)
  //   gists.map(gist => console.log(gist.url))
  //   console.log("useEffect po getListOfGists")
  // }, [gists]) 



// if(gists) {
  return (
    <div>
      {/* {gists.map((gist) => {
        return <div key={gist}></div>;
      })} */}
      <button type={"button"} onClick={getListOfGists}>Get all gists!</button>
      {gists.map((gist) => {
        return(
          <div key={gist.id}>
            <div>{gist.description}</div>
            <button type={"button"} onClick={() => deleteGist(gist.id)}>X</button>
          </div>
        )
      })}
 
    </div>
    );
  }
// }
