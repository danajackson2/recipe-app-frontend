import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const TopNav = ({ user }) => {
  return (
    <>
      <Navbar bg="primary">
        <LinkContainer exact to="/">
          <Navbar.Brand>RecipeApp</Navbar.Brand>
        </LinkContainer>
        {"username" in user ? (
          <Nav>
            <LinkContainer to="sign-up">
              <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
          </Nav>
        ) : (
          <Nav>
            <LinkContainer to="sign-in">
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
            <LinkContainer to="sign-up">
              <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
          </Nav>
        )}
      </Navbar>
    </>
  );
};

export default TopNav;
