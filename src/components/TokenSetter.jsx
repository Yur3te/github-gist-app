//tak, wiem - na razie nie działa xDD

import React, { useState, useEffect } from "react";

export default function TokenSetter(props) {
  const [enteredToken, setEnteredToken] = useState("");
  // const [tokenLoaded, setTokenLoaded] = useState(false)

  const tokenHandler = (event) => {
    setEnteredToken(event.target.value);
  };

  const saveToken = () => {
    localStorage.setItem("token", enteredToken);
    props.setToken(localStorage.getItem("token"));
    console.log("Token Saved");
  };

  useEffect(() => {
    setEnteredToken(props.token);
  }, [props.token]);

  return (
    <div>
      <label>Pls, Enter your token first: </label>
      <input type="text" value={enteredToken} onChange={tokenHandler}></input>
      <button
        onClick={(event) => {
          saveToken();
          props.createWrapper(event);
        }}
      >
        Zapisz token
      </button>
    </div>
  );
}
