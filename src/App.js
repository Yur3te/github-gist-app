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

  const createWrapper = (event) => {
    event.preventDefault();

    const wrapper = new gistsWrapper(token);
    wrapper
      .validate()
      .then((response) => {
        setWrapper(wrapper);
        setLogin(response.data.login);
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

  // const testing = () => {
  //   console.log(token);
  // };

  return (
    <div className="body">
      <div className="container">
        <div>Welcome {login} into Githubwrapper</div>
        {/* <div>{displayname}</div> */}
        <TokenSetter
          token={token}
          setToken={setToken}
          createWrapper={createWrapper}
        />
        <AddGist wrapper={wrapper} createWrapper={createWrapper} />
        <GistListing token={token} />
        {/* <button onClick={testing}>TESTING TOKEN BUTTON</button> */}
      </div>
    </div>
  );
}

export default App;
