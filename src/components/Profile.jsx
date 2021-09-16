import React, { useState, useEffect } from "react";

import "./../style/profile.css";

import kanna from "../images/tokenkanna.png";

export default function Profile(props) {
  const [login, setLogin] = useState("");
  const [avatar, setAvatar] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (props.tokenIsCorrect) {
      props.wrapper.validate().then((response) => {
        console.log(response.data);
        setLogin(response.data.login);
        setAvatar(response.data.avatar_url);
        setUrl(response.data.html_url);
      });
    }
  }, [props.tokenIsCorrect, props.wrapper]);

  if (props.tokenIsCorrect) {
    return (
      <div className="profile">
        <a href={url} target="_blank" rel="noreferrer">
          <img className="image" alt="profile_picture" src={avatar} />
        </a>
        <div>Welcome {login}!</div>
        <div>Feel free to use this application!</div>
      </div>
    );
  } else {
    return (
      <div className="content">
        <div className="text">Token goes there</div>
        <img className="image" alt="kanna" src={kanna} />
      </div>
    );
  }
}