// Libraries
import { Container } from "react-bootstrap";
import React, { useState } from "react";
// Components
import FeedBar from "./feed_components/FeedBar";
import RecipeForm from "./feed_components/RecipeForm";
import FeedCard from "./feed_components/FeedCard";

const Feed = ({
  recipes,
  user_id,
  username,
  user_likes,
  fetchRecipes,
  routerProps,
}) => {
  const [formOpen, setFormOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState("Date");
  const [sortDirection, setSortDirection] = useState("desc");

  const renderFeedCards = () => {
    let recipesCopy = [...recipes];
    let sorted;
    // sorts
    if (sort === "Likes") {
      if (sortDirection === "desc") {
        sorted = recipesCopy.sort((a, b) => b.likes - a.likes);
      } else {
        sorted = recipesCopy.sort((a, b) => a.likes - b.likes);
      }
    }

    if (sort === "Date") {
      if (sortDirection === "desc") {
        sorted = recipesCopy.sort((a, b) =>
          a.created_at < b.created_at ? 1 : -1
        );
      } else {
        sorted = recipesCopy.sort((a, b) =>
          b.created_at < a.created_at ? 1 : -1
        );
      }
    }
    // filters
    if (filters.some((f) => f === "liked")) {
      sorted = sorted.filter((recipe) =>
        user_likes.some((like) => like.recipe_id === recipe.id)
      );
    }
    if (filters.some((f) => f === "yours")) {
      sorted = sorted.filter((recipe) => {
        return recipe.username === username;
      });
    }

    return sorted.map((r) => (
      <FeedCard key={r.id} recipe={r} routerProps={routerProps} />
    ));
  };

  return (
    <>
      {user_id && (
        <FeedBar
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          filters={filters}
          setFilters={setFilters}
          sort={sort}
          setSort={setSort}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      )}
      {formOpen && <RecipeForm user_id={user_id} fetchRecipes={fetchRecipes} setFormOpen={setFormOpen}/>}
      <Container className="mt-4">
        <h1>
          {filters.some((filter) => filter === "yours") && "Your "}
          {sort === "Date"
            ? sortDirection === "desc"
              ? "Latest"
              : "First"
            : sort === "Likes"
            ? sortDirection === "desc"
              ? "Most Liked"
              : "Undiscovered"
            : null}{" "}
          Recipes {filters.some((filter) => filter === "liked") && "You Like"}
        </h1>
        <div className="d-flex justify-content-center flex-wrap">
          {renderFeedCards()}
        </div>
      </Container>
    </>
  );
};

export default Feed;
