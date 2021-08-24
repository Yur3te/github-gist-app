import React, { useState, useEffect } from "react";

export default function TokenSetter(props) {
  const [enteredToken, setEnteredToken] = useState("");

  const tokenHandler = (event) => {
    setEnteredToken(event.target.value);
  };

  const saveToken = () => {
    localStorage.setItem("token", enteredToken);
    props.setToken(localStorage.getItem("token"));
    console.log("Token Saved");
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
    props.setToken("");
    console.log("Token Deleted");
  };

  useEffect(() => {
    setEnteredToken(props.token);
  }, [props.token]);

  return (
    <div>
      <form
        onSubmit={(event) => {
          saveToken();
          props.createWrapper(event);
        }}
      >
        <label>Pls, Enter your token first: </label>
        <input type="text" value={enteredToken} onChange={tokenHandler}></input>
        <input type="submit" value="Zapisz token" />
        <button onClick={deleteToken}>Usuń token</button>
      </form>
    </div>
  );
}