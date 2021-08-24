import React, { useState, useEffect } from "react";

import AddGist from "./components/AddGist.jsx";
import GistListing from "./components/GistListing.jsx";
import TokenSetter from "./components/TokenSetter.jsx";

import gistsWrapper from "./js/gistsWrapper";

function App() {
  const [token, setToken] = useState("");
  const [wrapper, setWrapper] = useState(new gistsWrapper(""));
  const [login, setLogin] = useState("");

  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [tokenIsCorrect, setTokenIsCorrect] = useState(false)

  const createWrapper = (event) => {
    event.preventDefault();

    const wrapper = new gistsWrapper(token);
    wrapper
      .validate()
      .then((response) => {
        setWrapper(wrapper);
        setLogin(response.data.login);
        setTokenIsCorrect(true)
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401)
          console.log("coś jest nie tak z tokenem");
      });
  };

  useEffect(() => {
    let tkn = localStorage.getItem("token");
    if (tkn) {
      const wrapper = new gistsWrapper(token);
      wrapper
        .validate()
        .then((response) => {
          setWrapper(wrapper);
          setLogin(response.data.login);
          setTokenIsCorrect(true)
          console.log(response.data);
          console.log("token załadowany z local storage");
        })
        .catch((error) => {
          if (error.response.status === 401)
            console.log("coś jest nie tak z tokenem");
          setTokenLoaded(true);
        });
    } else setTokenLoaded(true);

    setToken(localStorage.getItem("token"));
  }, [tokenLoaded]);

  return (
    <div className="body">
      <div className="container">
        <div>Welcome into Githubwrapper!</div>
        <TokenSetter
          token={token}
          setToken={setToken}
          createWrapper={createWrapper}
        />
        {tokenIsCorrect ? <div>Hi {login}! Feel free to use this wrapper!</div> : null}
        <AddGist wrapper={wrapper} createWrapper={createWrapper} />
        <GistListing wrapper={wrapper} createWrapper={createWrapper}/>
      </div>
    </div>
  );
}

export default App;
