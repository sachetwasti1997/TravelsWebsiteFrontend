import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const UserItem = (props) => {

  let stt = {
    width: "90%",
    backgroundColor: "yellow",
    margin: "10px",
    // float: 'left' ,
  };
  let button = (
    <Card.Footer>
      <Link to={`/user/${props.id}`}>
        <Button style={{ width: "100%" }} varient="primary">
          See Profile
        </Button>
      </Link>
    </Card.Footer>
  );
  // console.log(props);
  if(props.loggedIn){
    if(props.loggedIn.userId === props.id){
      stt = {
        width: "90%",
        backgroundColor: "yellow",
        margin: "10px",
      }
      button = <div></div>;
    }
  }
  return (
    <Card
      as="li"
      style={stt}
    >
      <Card.Img
        style={{ height: "50%", width: "100%" }}
        variant="top"
        src={`http://localhost:5000/${props.image}`}
      />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <p>
          {props.placeCount.length > 1 ? "Places Visited " : "Place Visited "}{" "}
          {props.placeCount > 0 ? props.placeCount : 0}{" "}
        </p>
        <span></span>
      </Card.Body>
      {button}
    </Card>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return state;
}

export default connect(mapStateToProps)(UserItem);
