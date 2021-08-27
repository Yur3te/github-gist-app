import React, { useState, useEffect } from "react";

import AddGist from "./components/AddGist.jsx";
import GistListing from "./components/GistListing.jsx";
import TokenSetter from "./components/TokenSetter.jsx";

import gistsWrapper from "./js/gistsWrapper";

function App() {
  const [token, setToken] = useState("");
  const [wrapper, setWrapper] = useState(new gistsWrapper(""));
  const [login, setLogin] = useState("");

  // const [tokenLoaded, setTokenLoaded] = useState(false);
  const [tokenIsCorrect, setTokenIsCorrect] = useState(false)

  const createWrapper = (event) => {
    event.preventDefault();
    
    const wrapper = new gistsWrapper(token);
    if(token){
    wrapper
      .validate()
      .then((response) => {
        setWrapper(wrapper);
        setLogin(response.data.login);
        // setTokenIsCorrect(true)
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) console.log("coś jest nie tak z tokenem (From CreateWrapper)");
      });
    } else console.log("token nie został jeszcze załadowany (createWrapper)")
  };


  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if(token){
    // console.log("załadowany token:", token)
    const wrapper = new gistsWrapper(token);
    wrapper
      .validate()
      .then((response) => {
        setWrapper(wrapper);
        setLogin(response.data.login);
        console.log(response.data);
        console.log("token załadowany z local storage");
        setTokenIsCorrect(true)
      })
      .catch((error) => {
        if (error.response.status === 401)
          console.log("coś jest nie tak z tokenem (From useEffect)");
          console.log("aktualny token: ",token)
      });
      // setToken(localStorage.getItem("token"))
    } else console.log("token nie został jeszcze załadowany (useEffect)")
  }, [token]);

  return (
    <div className="body">
      <div className="container">
        <div>Welcome into Githubwrapper!</div>
        <TokenSetter
          token={token}
          setToken={setToken}
          createWrapper={createWrapper}
        />
        {tokenIsCorrect ? <div>Hi {login}! Feel free to use this wrapper!</div> : ""}
        <AddGist wrapper={wrapper} createWrapper={createWrapper} tokenIsCorrect={tokenIsCorrect}/>
        <GistListing wrapper={wrapper} createWrapper={createWrapper} tokenIsCorrect={tokenIsCorrect}/>
      </div>
    </div>
  );
}

export default App;
