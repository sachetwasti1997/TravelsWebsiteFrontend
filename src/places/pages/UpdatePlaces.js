import React, { Component } from "react";
import { Form } from "react-bootstrap";
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { updatePlace } from "../../actions";

class UpdatePlace extends Component {

  ID = '';

  id='null';
  placeAddress='';
  placeDescription='';
  placeTitle='';

  componentDidMount(){
      console.log(this.props.location.state);
  }

  handleTitleChange = (event) => {
    // this.setState({
        this.placeTitle= event.target.value    
    // })  
    // console.log(this.placeTitle);
  };

  handleDescriptionChange = (event) => {
    // this.setState({
      this.placeDescription= event.target.value       
    // }) 
  };

  handleAddressChange = (event) => {
    // this.setState({
      this.placeAddress= event.target.value       
    // }) 
  };

  checkState = () => {
      // console.log(this.props.location.state);
    if(this.props.location.state){
        const ID = this.props.location.state.place.id;
        this.id = ID;
        this.placeTitle =this.props.location.state.place.title;
        this.placeAddress=this.props.location.state.place.address;
        this.placeDescription= this.props.location.state.place.description;
        // console.log(this.placeTitle, this.placeAddress, this.placeDescription);    
    }
  }

  onSubmitClick = () => {
      const place = {
        id: this.id,
        title: this.placeTitle,
        address: this.placeAddress,
        description: this.placeDescription,
        token: this.props.location.state.place.token
      }
      this.props.update(place);
  }

  formFeilds = (disabled) => {
    // console.log(place);
    return (
      <Form>
        <Form.Group>
          <Form.Label>TITLE</Form.Label>
          <Form.Control
            type="text"
            onChange={this.handleTitleChange}
            defaultValue={this.placeTitle}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>DESCRIPTION</Form.Label>
          <Form.Control
            as="textarea"
            onChange={this.handleDescriptionChange}
            defaultValue={this.placeDescription}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ADDRESS</Form.Label>
          <Form.Control
            as="textarea"
            onChange={this.handleAddressChange}
            defaultValue={this.placeAddress}
          />
        </Form.Group>
        <Link
        to="/"
        >
          <Button onClick={this.onSubmitClick} disabled={disabled} variant="contained" color="secondary">
            Submit
          </Button>
        </Link>
      </Form>
    );
  };

  render() {
    
    // let ID = useParams().userId;
    console.log(this.props);
    this.checkState();
    let disable = true;
    if (
      this.placeTitle !== "" &&
      this.placeAddress !== "" &&
      this.placeDescription !== ""
    ) {
      disable = false;
    } 

    const Newcomponent = () => this.formFeilds(disable);

    return <Newcomponent/>;
  }
}

export default connect(null, {
  update: updatePlace
})(UpdatePlace);
/**And once I am with someone I will not leave her whatever happens. */