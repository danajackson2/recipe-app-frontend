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
import View from './components/View';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    if(localStorage.token){
      persistUser(localStorage.token)
    }
  }, [])
  
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
    localStorage.clear();
    setUser({})
  }

  const [recipes, setRecipes] = useState([
    {
      "id":1,
      "title": "Chef's Treat",
      "description": "This is a lovely lil treat for the chef.",
      "img":
        "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Chicken-Picatta-8.jpg?w=1200&auto=compress%2Cformat&fit=crop&fp-x=0.5&fp-y=0.5&dm=1599767276&s=2aa0bf00be2c34de44c1fb93a32ca68f",
      "user_id": 1,
      "username": 'danajackson',
      "ingredients": [
        {
          "name": "flour",
          "quantity": 1.5,
          "quantity_type": "cups",
        },
        {
          "name": "butter",
          "quantity": 4,
          "quantity_type": "tbsp",
        },
      ],
      "instructions": "put the lime in the coconut and mix it all up",
      "likes": [
        {user_id: 5, recipe_id: 1},
        {user_id: 2, recipe_id: 1},
        {user_id: 1, recipe_id: 1},
        {user_id: 1, recipe_id: 1}
      ],
      "comments": [
        {'username': 'danajackson', 'recipe_id':1, 'body':"This is a freakin' great recipe This is a freakin' great recipe This is a freakin' great recipe"},
        {'username': 'benswanson', 'recipe_id':1, 'body':"So tasty and schmekles"},
        {'username': 'danajackson', 'recipe_id':1, 'body':"Wowowowowooowow OMG SHEESH AMAZING"},

      ]
    },
  ]);
  return (
    <>
      <div className="body">
        <Router>
          <TopNav user={user} signIn={signIn} signUp={signUp} signOut={signOut}/>
          <Route exact path='/recipes/:id' render={routerProps => {
            const urlId = parseInt(routerProps.match.params.id)
            if(recipes.map(r => r.id).includes(urlId)){
              return <View recipe={recipes.find(r => r.id === urlId)}/>
            } 
          }}/>
          <Route exact path='/' render={() => <Feed recipes={recipes} />}/>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
