// Libraries
import { Container } from "react-bootstrap";
// Components
import FeedBar from "./feed_components/FeedBar";
import RecipeForm from "./feed_components/RecipeForm";
import FeedCard from "./feed_components/FeedCard";

const Feed = ({ recipes }) => {
  return (
    <>
      <FeedBar />
      <RecipeForm />
      <Container className="mt-4">
        <h1>Latest Recipes</h1>
        <FeedCard recipe={recipes[0]} />
      </Container>
    </>
  );
};

export default Feed;
