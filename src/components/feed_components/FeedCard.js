import { Card, Button } from "react-bootstrap";
import { Route, Redirect } from 'react-router'

const FeedCard = ({ recipe, routerProps }) => {

  const viewRecipe = () => {
    routerProps.history.push(`/recipes/${recipe.id}`)
  }
  
  return (
    <Card className="feedcard" onClick={viewRecipe}>
      <Card.Img variant="top" src={recipe.img} className="feedcard-image" />
      <Card.Body>
        <Card.Title className="feedcard-title">{recipe.name}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Card.Text><span>❤️ {recipe.likes}</span></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FeedCard;
