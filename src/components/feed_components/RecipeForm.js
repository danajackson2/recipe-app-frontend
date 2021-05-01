// Libraries
import { Container, Form, Col, Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons";

const RecipeForm = ({ user_id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState({
    0: { name: "", unit_of_measure: "", quantity: 0 },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        user_id: user_id,
        name: title,
        description: description,
        recipe_items: ingredients,
        instructions: instructions,
        img: imageUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const unitsOfMeasurement = [
    "N/A",
    "Tbsp",
    "Tsp",
    "Cups",
    "Pints",
    "Quarts",
    "Gallons",
    "Ounces",
    "Pounds",
  ];

  const renderOptions = () => {
    return unitsOfMeasurement.map((unit) => {
      return <option key={`${unit}-${Math.random()}`}>{unit}</option>;
    });
  };

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

  const removeIngredient = (rowKey) => {
    console.log(rowKey);
    let newIngredients = {};
    for (let index = 0; index < Object.keys(ingredients).length; index++) {
      if (index < parseInt(rowKey)) {
        newIngredients[index] = ingredients[index];
      } else if (index > parseInt(rowKey)) {
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
              as="select"
              id={key}
              name="unit_of_measure"
              options={unitsOfMeasurement}
              value={ingredients[key].unit_of_measure}
              onChange={handleIngredientChange}
            >
              {renderOptions()}
            </Form.Control>
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
              onClick={() => removeIngredient(key)}
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
        <Form className="mt-4" onSubmit={handleSubmit}>
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
                {140 - description.length === 1 ? "char" : "chars"} remaining
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
          <div className="mt-3 d-flex justify-content-end">
            <Button variant="secondary" onClick={addIngredient}>
              Add Ingredient
            </Button>
          </div>
          <hr />
          <Form.Row>
            <Col>
              <h4 className="orange">Instructions:</h4>
            </Col>
          </Form.Row>
          <Form.Row className="mb-3">
            <Col>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Teach your friends how to make this at home"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <hr />
          <Form.Row>
            <Col xs={4} md={3} lg={2}>
              <Form.Label>
                <h5>Image URL:</h5>
              </Form.Label>
            </Col>
            <Col xs={8} md={9} lg={10}>
              <Form.Control
                type="text"
                placeholder="Pics or it didn't happen"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <div className="d-flex justify-content-end mt-2">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default RecipeForm;
