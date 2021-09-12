import React, { useState, useEffect } from "react";

import "./../style/tokensetter.css";

export default function TokenSetter(props) {
  const [enteredToken, setEnteredToken] = useState("");

  const tokenHandler = (event) => {
    setEnteredToken(event.target.value);
  };

  const saveToken = (event) => {
    localStorage.setItem("token", enteredToken);
    props.setToken(localStorage.getItem("token"));
    console.log("Token Saved: ", props.token);
    props.createWrapper(event);
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
    <div className="tokensetter">
      <form onSubmit={saveToken}>
        {/* <label>Enter your token here: </label> */}
        <div>
          <input
            type="password"
            value={enteredToken}
            onChange={tokenHandler}
          ></input>
        </div>

        <div>
          <input className="button" type="submit" value="Save token" />
          <button className="button" onClick={deleteToken}>Delete token</button>
        </div>
      </form>
    </div>
  );
}
