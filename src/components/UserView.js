import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import FeedCard from "./feed_components/FeedCard";

const UserView = ({ recipes, selectedUserId, user, routerProps }) => {
  const [selUserName, setSelUserName] = useState("");

  const fetchUser = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/users/${selectedUserId}`)
      .then((res) => res.json())
      .then((data) => setSelUserName(data.username));
  };

  useEffect(() => {
    let foundRecipe = recipes.find(
      (recipe) => recipe.user_id === selectedUserId
    );
    if (foundRecipe) {
      setSelUserName(foundRecipe.username);
    } else {
      fetchUser();
    }
  }, []);

  const selectedUserRecipes = () => {
    return recipes.filter((recipe) => recipe.user_id === selectedUserId);
  };

  const selectedUserLikedRecipes = () => {
    return recipes.filter((recipe) =>
      recipe.who_liked.some((user) => user.user_id === selectedUserId)
    );
  };

  const isItMe = () => {
    return !!user.user_id && selectedUserId === user.user_id;
  };

  const viewRecipe = (id) => {
    routerProps.history.push(`/recipes/${id}`);
  };

  const formatDate = (date) => {
    let splitDate = date.split("-");
    return `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`;
  };

  return (
    <div id="user-view-div">
      <h1 id="user-view-header">{selUserName}</h1>
      <div>
        <h3>
          {isItMe() ? "My" : `${selUserName}'s`} {"Recipes"}
        </h3>
        <div className="d-flex justify-content-center flex-wrap">
          {selectedUserRecipes().map((r) => (
            <FeedCard routerProps={routerProps} recipe={r} />
          ))}
        </div>
      </div>
      <h3 className="mt-4">
        {"Recipes "}
        {isItMe() ? "I've" : `${selUserName} has`}
        {" liked"}
      </h3>
      <div className="like-scroll">
        {selectedUserLikedRecipes().map((r) => {
          return (
            <Card
              className="feedcard-sm my-3 mx-3"
              onClick={() => viewRecipe(r.id)}
            >
              <Card.Img
                variant="top"
                src={r.img}
                className="feedcard-sm-image"
              />
              <Card.Body className="feedcard-body-sm">
                <Card.Title className="feedcard-sm-title">{r.name}</Card.Title>
                <Card.Text>{r.description}</Card.Text>
              </Card.Body>
              <div className="ml-3 mr-3 d-flex justify-content-between">
                <p>{"❤️ " + r.likes}</p>
                <p>{formatDate(r.created_at)}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UserView;
