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
import Feed from "./components/Feed";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.token) {
      persistUser(localStorage.token);
    }
  }, []);

  function signUp(username, password) {
    fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ new_user: { username, password } }),
    })
      .then((res) => res.json())
      .then((data) => handleAuthResponse(data));
  }

  function signIn(username, password) {
    fetch(`${process.env.REACT_APP_BASE_URL}/signin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => handleAuthResponse(data));
  }

  const handleAuthResponse = (data) => {
    if (data.user_id) {
      const { username, user_id, token } = data;
      localStorage.setItem("token", token);
      setUser({ username, user_id });
    } else {
      alert(`Username ${data.username}`);
    }
  };

  const persistUser = (token) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/persist`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const { username, user_id } = data;
        setUser({ username, user_id });
      });
  };

  function signOut() {
    localStorage.clear();
    setUser({});
  }

  const [recipes, setRecipes] = useState([
    {
      "title": "Chef's Treat",
      "description": "This is a lovely lil treat for the chef.",
      "image":
        "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Chicken-Picatta-8.jpg?w=1200&auto=compress%2Cformat&fit=crop&fp-x=0.5&fp-y=0.5&dm=1599767276&s=2aa0bf00be2c34de44c1fb93a32ca68f",
      "author": "Dad",
      "ingredients": [
        {
          "name": "flour",
          "quantity": 1.5,
          "unit": "cups",
        },
        {
          "name": "butter",
          "quantity": 4,
          "unit": "tbsp",
        },
      ],
      "instructions": "put the lime in the coconut and mix it all up",
      "comments": [
        {
          "user": "Ben",
          "body": "this is a great recipe dad",
          "timestamp": "created_at_here",
        },
      ],
    },
  ]);
  return (
    <>
      <div className="body">
        <Router>
          <TopNav
            user={user}
            signIn={signIn}
            signUp={signUp}
            signOut={signOut}
          />
        </Router>
        <Feed recipes={recipes} />
      </div>
      <Footer />
    </>
  );
}

export default App;
