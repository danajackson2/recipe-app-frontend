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
import View from "./components/View";
import UserView from "./components/UserView";

function App() {
  const [user, setUser] = useState({});
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("recipes")) || []
  );

  useEffect(() => {
    if (localStorage.token) {
      persistUser(localStorage.token);
    }
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/recipes`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((recipes) => {
        setRecipes(recipes);
        localStorage.setItem("recipes", JSON.stringify(recipes));
      });
  };

  function signUp(username, password) {
    fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ new_user: { username, password } }),
    })
      .then((res) => res.json())
      .then((data) => handleAuthResponse(data))
      .then(() => fetchRecipes());
  }

  function signIn(username, password) {
    fetch(`${process.env.REACT_APP_BASE_URL}/signin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => handleAuthResponse(data))
      .then(() => fetchRecipes());
  }

  const handleAuthResponse = (data) => {
    if (data.user_id) {
      const { username, user_id, token, likes } = data;
      localStorage.setItem("token", token);
      setUser({ username, user_id, likes });
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
        const { username, user_id, likes } = data;
        setUser({ username, user_id, likes });
      });
  };

  function signOut() {
    localStorage.clear();
    setUser({});
  }

  const updateUserLikes = (like, type) => {
    if (type === "rmv") {
      const newLikes = user.likes.filter((likeItem) => likeItem.id !== like.id);
      setUser({ ...user, likes: newLikes });
    } else {
      const newLikes = [...user.likes, like];
      setUser({ ...user, likes: newLikes });
    }
  };

  const updateRecipeLikes = (recipe_id, type) => {
    let newRecipe = recipes.find((r) => r.id === recipe_id);

    if (type === "add") {
      newRecipe = { ...newRecipe, likes: newRecipe.likes + 1 };
    } else {
      newRecipe = { ...newRecipe, likes: newRecipe.likes - 1 };
    }

    const otherRecipes = recipes.filter((r) => r.id !== recipe_id);
    otherRecipes.push(newRecipe);
    setRecipes(otherRecipes);
  };

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
          <Route
            exact
            path="/recipes/:id"
            render={(routerProps) => {
              const urlId = parseInt(routerProps.match.params.id);
              if (!!recipes.find((r) => r.id === urlId)) {
                return (
                  <View
                    fetchRecipes={fetchRecipes}
                    updateUserLikes={updateUserLikes}
                    updateRecipeLikes={updateRecipeLikes}
                    user={user}
                    recipe={recipes.find((r) => r.id === urlId)}
                  />
                );
              }
            }}
          />
          <Route
            exact
            path="/users/:id"
            render={(routerProps) => {
              const urlId = parseInt(routerProps.match.params.id);
              return (
                <UserView
                  selectedUserId={urlId}
                  user={user}
                  recipes={recipes}
                  routerProps={routerProps}
                />
              );
            }}
          />
          <Route
            exact
            path="/"
            render={(routerProps) => (
              <Feed
                recipes={recipes}
                user_id={user.user_id}
                username={user.username}
                user_likes={user.likes}
                fetchRecipes={fetchRecipes}
                routerProps={routerProps}
              />
            )}
          />
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
