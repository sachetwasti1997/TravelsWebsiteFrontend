import React from "react";
import { Container } from "react-bootstrap";
import AddNewPlace from "../../shared/components/Forms/AddNewPlaceForm";

const NewPlace = () => {
  return (
    <Container
      style={{
        padding: "10px",
        margin: "10px",
        backgroundColor: "white",
        width: "100%",
      }}
    >
        <AddNewPlace/>
    </Container>
  );
};

export default NewPlace;
