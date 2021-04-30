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
  return (
    <>
      <div className="body">
        <Router>
          <TopNav user={user} />
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
