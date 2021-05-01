// Libraries
import { Container } from "react-bootstrap";
// Components
import FeedBar from "./feed_components/FeedBar";
import RecipeForm from "./feed_components/RecipeForm";
import FeedCard from "./feed_components/FeedCard";

const Feed = ({ recipes }) => {
  
  const renderFeedCards = () => {
    return recipes.map(r => <FeedCard recipe={r}/>)
  }

  return (
    <>
      <FeedBar />
      <RecipeForm />
      <Container className="mt-4">
        <h1>Latest Recipes</h1>
        {renderFeedCards()}
      </Container>
    </>
  );
};

export default Feed;
