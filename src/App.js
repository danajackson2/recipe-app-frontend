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
  return (
    <>
      <div className="body">
        <Router>
          <TopNav user={user} />
        </Router>
        <Feed />
      </div>
      <Footer />
    </>
  );
}

export default App;
