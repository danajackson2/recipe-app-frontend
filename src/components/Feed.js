// Libraries
import { Container } from "react-bootstrap";
import React, { useState } from "react";
// Components
import FeedBar from "./feed_components/FeedBar";
import RecipeForm from "./feed_components/RecipeForm";
import FeedCard from "./feed_components/FeedCard";

const Feed = ({ recipes, user_id, fetchRecipes }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("likeDesc");

  const renderFeedCards = () => {
    let sorted;
    if (sort === "likeDesc") {
      sorted = recipes.sort((a, b) => b.likes - a.likes);
    }
    if (sort === "likeAsc") {
      sorted = recipes.sort((a, b) => a.likes - b.likes);
    }
    return sorted.map((r) => <FeedCard key={r.id} recipe={r} />);
  };

  return (
    <>
      {user_id && <FeedBar formOpen={formOpen} setFormOpen={setFormOpen} />}
      {formOpen && <RecipeForm user_id={user_id} fetchRecipes={fetchRecipes} />}
      <Container className="mt-4">
        <h1>Latest Recipes</h1>
        {renderFeedCards()}
      </Container>
    </>
  );
};

export default Feed;
