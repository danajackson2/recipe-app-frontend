// Libraries
import { Container } from "react-bootstrap";
// Components
import FeedBar from "./feed_components/FeedBar";
import RecipeForm from "./feed_components/RecipeForm";
import FeedCard from "./feed_components/FeedCard";

const Feed = ({ recipes, user_id, fetchRecipes, routerProps }) => {
  const renderFeedCards = () => {
    return recipes.map((r) => <FeedCard recipe={r} routerProps={routerProps} />);
  };

  return (
    <>
      <FeedBar />
      <RecipeForm user_id={user_id} fetchRecipes={fetchRecipes} />
      <Container className="mt-4">
        <h1>Latest Recipes</h1>
        {renderFeedCards()}
      </Container>
    </>
  );
};

export default Feed;
