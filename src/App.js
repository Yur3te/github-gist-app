import React, { useState, useEffect } from "react";

import AddGist from "./components/AddGist.jsx";
import GistListing from "./components/GistListing.jsx";
import TokenSetter from "./components/TokenSetter.jsx";
import Profile from "./components/Profile"


import gistsWrapper from "./js/gistsWrapper";
import EditGist from "./components/EditGist.jsx";

function App() {
  const [token, setToken] = useState("");
  const [wrapper, setWrapper] = useState(new gistsWrapper(""));

  const [editingId, setEditingId] = useState()

  const [tokenIsCorrect, setTokenIsCorrect] = useState(false)

  const createWrapper = (event) => {
    event.preventDefault();
    
    const wrapper = new gistsWrapper(token);
    
    if(token){
    wrapper
      .validate()
      .then((response) => {
        setWrapper(wrapper);
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) console.log("Something is wrong with token");
      });
    } else console.log("Token hasn't been loaded")
  };


  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if(token){
      const wrapper = new gistsWrapper(token);
      console.log("Wrapper has been created!")
      wrapper
        .validate()
        .then((response) => {
          setWrapper(wrapper);
          console.log(response.data);
          console.log("token załadowany z local storage");
          setTokenIsCorrect(true)
        })
        .catch((error) => {
          if (error.response.status === 401)
            console.log("coś jest nie tak z tokenem (From useEffect)");
            console.log("aktualny token: ",token)
        });
      } else console.log("token nie został jeszcze załadowany (useEffect)")
  }, [token]);

  return (
    <div className="body">
      <div className="container">
        <TokenSetter token={token} setToken={setToken} createWrapper={createWrapper}/>
        <Profile wrapper={wrapper} tokenIsCorrect={tokenIsCorrect}/>
        <AddGist wrapper={wrapper} createWrapper={createWrapper} tokenIsCorrect={tokenIsCorrect}/>
        <GistListing setEditingId={setEditingId} wrapper={wrapper} createWrapper={createWrapper} tokenIsCorrect={tokenIsCorrect}/>
        <EditGist editingId={editingId} setEditingId={setEditingId} wrapper={wrapper}/>
      </div>
    </div>
  );
}

export default App;