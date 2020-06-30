import React, { Component } from "react";
import { Form, Container } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { addPlace } from "../../../actions";
import { Link } from "react-router-dom";
import ImageUpload from "../ImageUpload";

class AddNewPlace extends Component {

  state = {
    renderForm: false,
    image: null
  }  

  setImage = (imageData) => {
    this.setState({
      image: imageData
    })
  }

  id = null;
  placeTitle = "";
  placeAddress = "";
  placeDescription = "";
  count = 0;

  handleTitleChange = (event) => {
    this.placeTitle = event.target.value;
    if(this.count >= 1){
        this.setState({renderForm: true})
    }
    this.count = 0;
    // console.log(this.placeTitle);
  };

  handleDescriptionChange = (event) => {
    this.placeDescription = event.target.value;
    if(this.count >= 1){
        this.setState({renderForm: true})
    }
    // console.log(this.placeDescription);
  };

  handleAddressChange = (event) => {
    this.placeAddress = event.target.value;
    if(this.count >= 1){
        this.setState({renderForm: true})
    }
    console.log(this.placeAddress);
  };

  onSubmitClick = () => {
    console.log(this.props);
    const jsonData = {
      title: this.placeTitle,
      description: this.placeDescription,
      address: this.placeAddress,
      creator: this.props.state.loggedIn.userId,
      image: this.state.image,
      token: this.props.state.loggedIn.token
    }
    console.log(jsonData);
    this.props.sendPlace(jsonData);
  }

  formFeilds = (disabled) => {
    return <Form>
      <Form.Group>
        <Form.Label>TITLE</Form.Label>
        <Form.Control onMouseEnter={() => {this.count++}} type="text" onChange={this.handleTitleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>DESCRIPTION</Form.Label>
        <Form.Control onMouseEnter={() => {this.count++}} as="textarea" onChange={this.handleDescriptionChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>ADDRESS</Form.Label>
        <Form.Control onMouseEnter={() => {this.count++}} as="textarea" onChange={this.handleAddressChange} />
      </Form.Group><hr/>
      <ImageUpload image={this.setImage}/><hr/>
      <Link
      to ={`/`}>
        <Button onClick={this.onSubmitClick} disabled={disabled} variant="contained" color="secondary">
          Submit
        </Button>
      </Link>
    </Form>;
  };

  render() {
    // console.log(this.props);
    // let formToRender = null;
    let disable = true;
    if (
      this.placeTitle !== "" &&
      this.placeAddress !== "" &&
      this.placeDescription !== "" &&
      this.state.image !== null
    ) {
      disable = false;
    }

    return <Container>{this.formFeilds(disable)}</Container>;
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {state}
}

export default connect(mapStateToProps,{
  sendPlace: addPlace
})(AddNewPlace);
