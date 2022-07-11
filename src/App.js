import { useState } from "react";
import "./App.css";
import Dp from "./contact.png";

export default function App() {
  const [username, setusername] = useState("");
  const [values, setValues] = useState({
    name: "",
    avatar_url: Dp,
    login: "",
    public_repos: null,
    followers: null,
    following: null,
    location: null,
    email: null
  });

  const onchangehandler = (e) => {
    setusername(e.target.value);
  };
  const search = (e) => {
    e.preventDefault();
    console.log(username);

    fetch(`https://api.github.com/users/${username}`)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log(data);
        setValues(data);
      });
  };

  return (
    <>
      <div className="main">
        <div className="searchcontainer">
          <h1 className="title">user profile on git hub</h1>
          <div>
            <form onSubmit={search} className="form">
              <input
                id="user"
                value={username}
                onChange={onchangehandler}
                required
              />
              <button type="submit">search</button>
            </form>
          </div>
        </div>
        <div className="display">
          <h2 className="displaytitle">user details</h2>
          <div className="container">
            <div className="left">
              <img src={values.avatar_url} width="50px" height="50px" alt="avatar" />
              <h4 className="id"> {values.login}</h4>
              <h4 className="name">{values.name}</h4>
            </div>
            <div className="right">
              <div className="upperRight">
                <div className="item">
                  <span>{values.public_repos}</span>
                  <h2>Repo</h2>
                </div>

                <div className="item">
                  <span>{values.followers}</span>
                  <h2>followers</h2>
                </div>

                <div className="item">
                  <span>{values.following}</span>
                  <h2>following</h2>
                </div>
              </div>
              <div className="lowerRight">
                <h4> Email : {values.email}</h4>
                <h4> location : {values.location}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
