import { Container, Form, Col, Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState({
    0: { name: "", unit_of_measure: "", quantity: 0 },
  });

  const handleIngredientChange = (e) => {
    setIngredients({
      ...ingredients,
      [e.target.id]: {
        ...ingredients[e.target.id],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 140) {
      setDescription(e.target.value);
    }
  };

  const addIngredient = () => {
    setIngredients({
      ...ingredients,
      [Object.keys(ingredients).length]: {
        name: "",
        unit_of_measure: "",
        quantity: 0,
      },
    });
  };

  const removeIngredient = (e) => {
    let newIngredients = {};
    for (let index = 0; index < Object.keys(ingredients).length; index++) {
      if (index < e.target.id) {
        newIngredients[index] = ingredients[index];
      } else if (index > e.target.id) {
        newIngredients[index - 1] = ingredients[index];
      }
    }
    setIngredients(newIngredients);
  };

  const renderIngredientFields = () => {
    return Object.keys(ingredients).map((key) => {
      return (
        <Form.Row key={key} className="mt-1">
          <Col xs={4}>
            <Form.Control
              id={key}
              name="name"
              value={ingredients[key].name}
              onChange={handleIngredientChange}
            ></Form.Control>
          </Col>
          <Col xs={4}>
            <Form.Control
              id={key}
              name="quantity"
              value={ingredients[key].unit_of_measure}
              onChange={handleIngredientChange}
            ></Form.Control>
          </Col>
          <Col xs={3}>
            <Form.Control
              id={key}
              name="quantity"
              value={ingredients[key].quantity}
              onChange={handleIngredientChange}
            ></Form.Control>
          </Col>
          <Col xs={1} className="icon-col">
            <FontAwesomeIcon
              id={key}
              onClick={removeIngredient}
              icon={faMinusSquare}
              size="lg"
              className="recipeform-minus mt-2"
            />
          </Col>
        </Form.Row>
      );
    });
  };

  return (
    <Container>
      <Card className="px-4 pb-4 mt-4">
        <Form className="mt-4">
          <Form.Row>
            <h2 className="orange">New Recipe</h2>
          </Form.Row>
          <hr />
          <Form.Row className="mb-2">
            <Form.Label column="xs" xs={3}>
              <h5>Recipe Name:</h5>
            </Form.Label>
            <Col xs={9}>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Let's give this masterpiece a name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row>
            <Form.Label column="xs" xs={3}>
              <h5>Description:</h5>
              <p className="recipeform-remainingchars">
                {140 - description.length}{" "}
                {140 - description.length == 1 ? "char" : "chars"} remaining
              </p>
            </Form.Label>
            <Col xs={9}>
              <Form.Control
                size="lg"
                as="textarea"
                rows={4}
                placeholder="Tell us about this beauty"
                value={description}
                onChange={handleDescriptionChange}
              ></Form.Control>
            </Col>
          </Form.Row>
          <hr />
          <Form.Row>
            <Col>
              <h4 className="orange">Ingredients:</h4>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col xs={4}>
              <Form.Label>
                <h4>Name</h4>
              </Form.Label>
            </Col>
            <Col xs={4}>
              <Form.Label>
                <h4>Units</h4>
              </Form.Label>
            </Col>
            <Col xs={3}>
              <Form.Label>
                <h4>Quantity</h4>
              </Form.Label>
            </Col>
          </Form.Row>
          {renderIngredientFields()}
          <Form.Row className="mt-3 d-flex justify-content-end">
            <Button variant="secondary" onClick={addIngredient}>
              Add Ingredient
            </Button>
          </Form.Row>
          <hr />
          <Form.Row>
            <Col>
              <h4 className="orange">Instructions:</h4>
            </Col>
          </Form.Row>
          <Form.Row className="mb-3">
            <Col>
              <Form.Control
                size="lg"
                as="textarea"
                rows={4}
                placeholder="Teach your friends how to make this at home"
                value={description}
                onChange={handleDescriptionChange}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row className="d-flex justify-content-end">
            <Button type="submit">Submit</Button>
          </Form.Row>
        </Form>
      </Card>
    </Container>
  );
};

export default RecipeForm;
