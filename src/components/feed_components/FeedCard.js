import { Card, Button } from "react-bootstrap";
import { Route, Redirect } from "react-router";

const FeedCard = ({ recipe, routerProps }) => {
  const viewRecipe = () => {
    routerProps.history.push(`/recipes/${recipe.id}`);
  };

  const formatDate = (date) => {
    let splitDate = date.split("-");
    return `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`;
  };

  return (
    <Card className="feedcard my-3 mx-3" onClick={viewRecipe}>
      <Card.Img variant="top" src={recipe.img} className="feedcard-image" />
      <Card.Body>
        <Card.Title className="feedcard-title">{recipe.name}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
      </Card.Body>
      <div className="ml-3 mr-3 d-flex justify-content-between">
        <p>{"❤️ " + recipe.likes}</p>
        <p>{formatDate(recipe.created_at)}</p>
      </div>
    </Card>
  );
};

export default FeedCard;
