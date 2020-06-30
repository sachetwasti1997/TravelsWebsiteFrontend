import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { logOut } from "../../actions";

const setRoute = (props) => {
  const logOutClick = () => {
    console.log('LogOut clicked');
    logOut();
    window.location.reload();
  };
  let routes;
  // console.log(props);
  if (props.loggedIn || props.signUp) {
    let link;
    if(props.loggedIn){
      link = (
        <NavLink
          to={`/user/${props.loggedIn.userId}`}
          style={{ color: "white", marginRight: "15px" }}
          exact
        >
          MY PLACES
        </NavLink>
      )
    }else if(props.signUp){
      link = (
        <NavLink
          to={`/user/${props.signUp.userId}`}
          style={{ color: "white", marginRight: "15px" }}
          exact
        >
          MY PLACES
        </NavLink>
      )
    }
    routes = (
      <Nav className="mr-auto">
        <NavLink to="/" style={{ color: "white", marginRight: "15px" }} exact>
          ALL USERS
        </NavLink>
        {link}
        <NavLink
          to="/places/new"
          style={{ color: "white", marginRight: "15px" }}
          exact
        >
          ADD PLACES
        </NavLink>
        <NavLink
          to="/"
          onClick={logOutClick}
          style={{ color: "white", marginRight: "15px" }}
        >
          LOGOUT
        </NavLink>
      </Nav>
    );
  } else {
    routes = (
      <Nav className="mr-auto">
        <NavLink to="/" style={{ color: "white", marginRight: "15px" }} exact>
          ALL USERS
        </NavLink>
        <NavLink
          to="/auth"
          style={{ color: "white", marginRight: "15px" }}
          exact
        >
          AUTHENTICATE
        </NavLink>
      </Nav>
    );
  }
  return routes;
};

// const Links = ({ loggedIn }) => {
//   const routes = setRoute(loggedIn);
//   return routes;
// };

const mapStateToProps = (state) => {
  // console.log(state);
  return state;
};

export default connect(mapStateToProps)(setRoute);
