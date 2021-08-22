//tak, wiem - na razie nie działa xDD

import React, { useState } from "react";

const token = require("../js/config.js");

export default function TokenSetter() {
  const [enteredToken, setEnteredToken] = useState("");

  const tokenHndler = (event) => setEnteredToken(event.target.value);

  const defaultTokenSetter = () => {
    setEnteredToken(token);
  };
  return (
    <div>
      <label>Pls, Enter your token first: </label>
      <input
        type="password"
        value={enteredToken}
        onChange={tokenHndler}
      ></input>
      <button onClick={defaultTokenSetter}>Import from config file</button>
    </div>
  );
}
