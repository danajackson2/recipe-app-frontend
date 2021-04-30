// Libraries
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if(localStorage.token){
      persistUser(localStorage.token)
    }
  }, [user])
  
  function signUp(username, password){
    fetch(`${process.env.REACT_APP_BASE_URL}/users`,{
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({new_user: {username, password}})
    })
    .then(res => res.json())
    .then(data => handleAuthResponse(data))
  }

  function signIn(username, password){
    fetch(`${process.env.REACT_APP_BASE_URL}/signin`,{
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .then(data => handleAuthResponse(data))
  }

  const handleAuthResponse = (data) => {
    if (data.user_id) {
        const { username, user_id, token} = data
        localStorage.setItem('token', token)
        setUser({ username, user_id })
    } else {
        alert(`Username ${data.username}`)
    }   
  }

  const persistUser = (token) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/persist`,{
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => res.json())
    .then(data => {
      const { username, user_id } = data
      setUser({ username, user_id })
    })
  }

  function signOut(){
    localStorage.clear()
    setUser({})
  }

  return (
    <>
      <div className="body">
        <Router>
          <TopNav user={user} signIn={signIn} signUp={signUp} signOut={signOut}/>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
