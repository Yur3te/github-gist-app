//tak, wiem - na razie nie działa xDD

import React, { useState, useEffect } from "react";

export default function TokenSetter(props) {
  const [enteredToken, setEnteredToken] = useState("");
  // const [tokenLoaded, setTokenLoaded] = useState(false)
 
  

  const tokenHandler = (event) => {
    setEnteredToken(event.target.value);
    // localStorage.setItem("token", enteredToken);
    // props.setToken(event.target.value);
    console.log("Token Handler");
    // console.log(props.token);
    // setEnteredToken(localStorage.getItem("token"))
    // console.log(enteredToken)
  };


  const saveToken = () => {
    localStorage.setItem("token", enteredToken);
    props.setToken(localStorage.getItem("token"))
    console.log("save Token");
    // props.setToken(token);
    // setEnteredToken(token)
    // console.log(props.token);
    // props.createWrapper()
  };

  // useEffect(() => {
  //   let tempToken = localStorage.getItem("token")
  //   if(tempToken) {
  //     props.setToken(localStorage.getItem("token"))
  //   }
  //   else {
  //     console.log("token nie został jeszcze załadowany")
  //   }
  

    // localStorage.setItem("token", enteredToken)
    // let token = localStorage.getItem("token")
    // props.setToken(token)
    // console.log(token);
    // props.setToken(localStorage.getItem("token"))
  //   console.log("use Effect");
  // })
  // const defaultTokenSetter = () => {
  //   setEnteredToken(props.token);

  return (
    <div>
      <label>Pls, Enter your token first: </label>
      <input type="text" value={enteredToken} onChange={tokenHander}></input>
      <button onClick={saveToken}>Zapisz token</button>
    </div>
  );
}
