import React from "react";
import { Container } from "react-bootstrap";

// renders if the UserContext has not yet been set
function Loading() {
  return (
    <React.Fragment>
      <Container>
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-info" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Loading;
