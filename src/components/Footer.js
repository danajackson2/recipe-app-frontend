import React from "react";
import { Container, Row } from "react-bootstrap";
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
        <Row className="d-flex justify-content-center">
          <div className="mr-4 footer-byline">
            <p>Made by Ben Swanson © 2021</p>
          </div>
          <div className="ml-4">
            <a href="mailto:bswan0002@gmail.com">bswan0002@gmail.com</a>
            <a href="https://github.com/bswan0002/">
              <FontAwesomeIcon icon={faGithub} className="mx-4" />
            </a>
            <a href="https://www.linkedin.com/in/bswan0002/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
