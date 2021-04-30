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
import Feed from "./components/Feed";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState({});
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
    },
  ]);
  return (
    <>
      <div className="body">
        <Router>
          <TopNav user={user} />
        </Router>
        <Feed recipes={recipes} />
      </div>
      <Footer />
    </>
  );
}

export default App;
