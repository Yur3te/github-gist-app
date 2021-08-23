import React, { useState, useEffect } from "react";

import AddGist from "./components/AddGist.jsx";
import GistListing from "./components/GistListing.jsx";
import TokenSetter from "./components/TokenSetter.jsx";

// import { token } from './config.json';
// const reftreshToken = () => {
//   const token = localStorage.getItem("token"
// }
import gistsWrapper from "./js/gistsWrapper";

function App() {
  const [token, setToken] = useState("")
  const [wrapper, setWrapper] = useState(new gistsWrapper(""))
  const [displayname, setDisplayname] = useState("")
  
  const createWrapper = (event) => {
    event.preventDefault()

    const wrapper = new gistsWrapper(token)
    wrapper.validate()
    .then(response => {
        setWrapper(wrapper)
        setToken(localStorage.getItem("token"))
        // setTokenIsCorrect(true)
        // setDisplayname(response.data.name)
        // setLogin(response.data.login)
        // setTokenLoaded(true)

        // setCookie('token', token, 1)

        // throwMessage('success', "Token is correct")
    })
    // .catch(error => {
    //     if (error.response.status === 401)
    //         throwMessage('failure', "Token is incorrect")
    //     else if (error.response.status === 403)
    //         throwMessage('failure', "API rate limit exceeded for this user")
    // })
  }

  // useEffect(()=>
  // {
  //   const wrapper = new gistsWrapper(token)
  //           wrapper.validate()
  //           .then(response => {
  //               setWrapper(wrapper)
  //               setToken(localStorage.getItem("token"))
  //           })
  //         .catch(error => {
  //           console.log("Nieprawidłowy Token")
  //         })
  // })
  


  
  return (
    <div className="body">
      <div className="container">
        <div>Welcome into Githubwrapper</div>
        <TokenSetter token={token} setToken={setToken} createWrapper={createWrapper}/>
        <AddGist token={token} wrapper={wrapper}/>
        <GistListing token={token}/>
      </div>
    </div>
  );
}

export default App;
