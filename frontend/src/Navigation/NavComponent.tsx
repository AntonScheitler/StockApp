import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

// navbar, which allows the user to navigate between different parts of the app
function NavComponent() {
  return (
    <React.Fragment>
      <Navbar bg="light" sticky="top">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/watchlist">Watchlist</Nav.Link>
            <Nav.Link href="/">Stocks</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default NavComponent;
