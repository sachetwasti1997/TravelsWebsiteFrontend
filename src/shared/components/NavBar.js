import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { ReactComponent as Logo } from "./logo.svg";
import { Link } from 'react-router-dom';
import Links from './NavLinks2';

class NavBar extends Component{

    navBar(){
        return(
                <Navbar collapseOnSelect expand="sm" bg="primary" variant="light">
                  <Navbar.Brand>
                    <Link to="/" style={{color: 'white', marginRight:'15px'}}>
                      <Logo
                        alt=""
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                      />
                      <strong>Your Places</strong>
                    </Link>
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                    <Links/>
                    </Nav>
                    
                  </Navbar.Collapse>
                </Navbar>
        )
    }

    render(){
        return <div style={{backgroundColor:'black', color:'white'}}>
           {this.navBar()}
        </div>
    }
}

export default NavBar;