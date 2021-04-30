import { Container, Form, Col, Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState({
    0: { name: "", quantity: 0 },
  });

  const handleChange = (e) => {
    setIngredients({
      ...ingredients,
      [e.target.id]: {
        ...ingredients[e.target.id],
        [e.target.name]: e.target.value,
      },
    });
  };

  return <div>recipeform</div>;
};

export default RecipeForm;
