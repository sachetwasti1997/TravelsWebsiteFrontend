import React from "react";
import { Container } from "react-bootstrap";
import UserItem from "./UserItem";
import { connect } from "react-redux";

const noLoginsignUp = (arr) => {
  const arrRender = [];
  let userRender = null;
  arrRender.push(
    arr.map((user) => (
      <UserItem
        key={user.id}
        id={user.id}
        image={user.image}
        name={user.name}
        placeCount={user.places.length}
      />
    ))
  );
  return {userRender, arrRender};
};

const caseLogIn = (arr, userId) => {
  let user;

  const arrRender = [];
  let userRender = null;

  user = arr.find((uss) => uss.id === userId);

  // console.log(user);
  userRender = (
    <div>
      <UserItem
        id={user.id}
        image={user.image}
        name={user.name}
        placeCount={user.places.length}
      />
    </div>
  );
  arr.forEach((element) => {
    // console.log(element.id);
    if (element.id !== userId) {
      arrRender.push(
        <UserItem
          key={element.id}
          id={element.id}
          image={element.image}
          name={element.name}
          placeCount={element.places.length}
        />
      );
    }
  });
  return {userRender, arrRender};
};

const caseSignUp = (arr, userId) => {
  let user;
  window.location.reload();
  const arrRender = [];
  let userRender = null;

  user = arr.find((uss) => uss.id === userId);

  // console.log(user);
  userRender = (
    <div>
      <UserItem
        id={user.id}
        image={user.image}
        name={user.name}
        placeCount={user.places.length}
      />
    </div>
  );
  arr.forEach((element) => {
    // console.log(element.id);
    if (element.id !== userId) {
      arrRender.push(
        <UserItem
          key={element.id}
          id={element.id}
          image={element.image}
          name={element.name}
          placeCount={element.places.length}
        />
      );
    }
  });
  return {userRender, arrRender};
};

const UserList = (props) => {
  // console.log(props);

  if (!props.usersList || props.usersList.length === 0) {
    return (
      <Container>
        <h2>No Users found!</h2>
      </Container>
    );
  } else {
    // console.log(props);
    if (!props.state.loggedIn && !props.state.signUp) {
      const {userRender, arrRender} = (noLoginsignUp(props.usersList));
      // console.log(userRender);
      // console.log(arrRender)
      return (
        <div>
          <div>{userRender}</div>
          {"\n"}
  
          <div>{arrRender}</div>
        </div>
      );
    } else if (props.state.loggedIn) {
      const {userRender, arrRender} = (caseLogIn(props.usersList, props.state.loggedIn.userId));
      // console.log(userRender);
      // console.log(arrRender)
      return (
        <div>
          <div>{userRender}</div>
          {"\n"}
  
          <div>{arrRender}</div>
        </div>
      );
    } else if (props.state.signUp) {
      const {userRender, arrRender} = (caseSignUp(props.usersList, props.state.signUp.userId));
      // console.log(userRender);
      // console.log(arrRender)
      return (
          <div>
            <div>{userRender}</div>
            {"\n"}
  
            <div>{arrRender}</div>
          </div>
      );
    }
  }
  // return <div></div>
};

const mapStateToProps = (state) => {
  // console.log(state);
  return { state };
};

export default connect(mapStateToProps)(UserList);
