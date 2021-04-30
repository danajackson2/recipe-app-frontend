// Libraries
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// Styles
import "./App.css";
import "./custom.scss";
// Components
import TopNav from "./components/TopNav";
import Footer from "./components/Footer.js";

function App() {
  const [user, setUser] = useState({});
  
  function signUp(username, password){
    fetch(`${process.env.REACT_APP_BASE_URL}/users`,{
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({new_user: {username, password}})
  })
  .then(res => res.json())
  .then(console.log)
  // .then(data => handleAuthResponse(data))
  }

  function signIn(username, password){
    fetch(`${process.env.REACT_APP_BASE_URL}/signin`,{
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({username, password})
  })
  .then(res => res.json())
  .then(console.log)
  // .then(data => handleAuthResponse(data))
  }


  return (
    <>
      <div className="body">
        <Router>
          <TopNav user={user} signIn={signIn} signUp={signUp}/>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
