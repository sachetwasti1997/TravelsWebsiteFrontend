import React from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {
  // console.log(props);
  if (props.place === undefined || props.place.length === 0) {
    // console.log(props.items)
    return (
      <Container style={{ textAlign: "center" }}>
        <Card>
          <Card.Title>No Places Found</Card.Title>
          <Card.Footer>
            <Card.Text>
              It seems that no places have been shared, by the user.
            </Card.Text>
          </Card.Footer>
        </Card>
      </Container>
    );
  }

  return (
    <ListGroup as="ul">
      {props.place.map(place => {
        return(
        <PlaceItem key = {place.id}
          id={place.id}
          title= {place.title}
          description = {place.description}
          image={place.image}
          creator={place.creator}
          address ={place.address}
        />
        )
      })}
    </ListGroup>
  );
// };    
}

export default PlaceList;
