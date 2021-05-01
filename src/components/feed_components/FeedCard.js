import { Card, Button } from "react-bootstrap";

const FeedCard = ({ recipe }) => {
  return (
    <Card className="feedcard">
      <Card.Img variant="top" src={recipe.img} className="feedcard-image" />
      <Card.Body>
        <Card.Title className="feedcard-title">{recipe.name}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Card.Text><span>❤️ </span>{recipe.likes}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FeedCard;
