import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  faReact,
  faBootstrap,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="d-flex justify-content-center">
          <h2 className="mt-4 foot-title">
            Insert Clever Recipe App Name Here
          </h2>
        </Row>

        <Row className="d-flex justify-content-center">
          <p>
            Powered by{" "}
            {<FontAwesomeIcon icon={faReact} style={{ color: "#14abd5" }} />}{" "}
            React | Styled with{" "}
            {
              <FontAwesomeIcon
                icon={faBootstrap}
                style={{ color: "#8c5ad8" }}
              />
            }{" "}
            Bootstrap
          </p>
        </Row>
        <Row>
          <Col
            sm={4}
            xs={12}
            className="footer-byline"
            style={{ textAlign: "center" }}
          >
            <p>Made by Dana Jackson and Ben Swanson © 2021</p>
          </Col>
          <Col sm={4} xs={12} style={{ textAlign: "center" }}>
            <a href="mailto:danajackson2@gmail.com">danajackson2@gmail.com</a>
            <a href="https://github.com/danajackson2/">
              <FontAwesomeIcon icon={faGithub} className="mx-4" />
            </a>
            <a href="https://www.linkedin.com/in/danajackson2/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </Col>
          <Col sm={4} xs={12} style={{ textAlign: "center" }}>
            <a href="mailto:bswan0002@gmail.com">bswan0002@gmail.com</a>
            <a href="https://github.com/bswan0002/">
              <FontAwesomeIcon icon={faGithub} className="mx-4" />
            </a>
            <a href="https://www.linkedin.com/in/bswan0002/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
