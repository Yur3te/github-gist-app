import React, { useState, useEffect } from "react";

export default function TokenSetter(props) {
  const [enteredToken, setEnteredToken] = useState("");

  const tokenHandler = (event) => {
    setEnteredToken(event.target.value);
  };

  const saveToken = (event) => {
    localStorage.setItem("token", enteredToken);
    props.setToken(localStorage.getItem("token"));
    console.log("Token Saved: ", props.token);
    props.createWrapper(event)
  };

  const deleteToken = () => {
    localStorage.setItem("token", "");
    props.setToken("");
    console.log("Token Deleted");
  };

  useEffect(() => {
    setEnteredToken(props.token);
  }, [props.token]);

  return (
    <div>
      <form
        onSubmit={saveToken}
      >
        <label>Pls, Enter your token first: </label>
        <input type="password" value={enteredToken} onChange={tokenHandler}></input>
        <input type="submit" value="Save token" />
        <button onClick={deleteToken}>Delete token</button>
      </form>
    </div>
  );
}
