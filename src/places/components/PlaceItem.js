import React from "react";
import { Card, Container } from "react-bootstrap";
import {
  MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  Typography,
  Button,
} from "@material-ui/core";

import Dialogs from "../../shared/components/createDialogs";
import { Link } from "react-router-dom";
import { deletePlace } from "../../actions";
import { connect } from "react-redux";

const PlaceItem = (props) => {

  let stateTrans;
  let footer = null;

  const caseLogIn = () => {
  // console.log(props.loggedIn.userId === props.creator)
  if(props.loggedIn.userId === props.creator){
    footer = (
  <Card.Footer>
    <Link
      to={{
        pathname: `/places/${props.id}`,
        state: {
          place: stateTrans,
        },
      }}
    >
      <Button variant="contained" color="secondary">
        EDIT
      </Button>{" "}
    </Link>
    <Button
      onClick={deleteClick}
      variant="contained"
      color="secondary"
    >
      DELETE
    </Button>
    <Dialogs
      id={props.id}
      open={open}
      handleClose={handleClose}
      title={title}
      token={stateTrans.token}
      description={description}
      deleteHelp={deleteButton}
      onDeletePlace={deletePlace}
    />
  </Card.Footer>
    );
  }
  }

  const caseSignUp = () => {
    console.log(props.signUp.userId === props.creator);
    if(props.signUp.userId === props.creator){
    footer = (
      <Card.Footer>
        <Link
          to={{
            pathname: `/places/${props.id}`,
            state: {
              place: stateTrans,
            },
          }}
        >
          <Button variant="contained" color="secondary">
            EDIT
          </Button>{" "}
        </Link>
        <Button
          onClick={deleteClick}
          variant="contained"
          color="secondary"
        >
          DELETE
        </Button>
        <Dialogs
          id={props.id}
          open={open}
          handleClose={handleClose}
          title={title}
          token={stateTrans.token}
          description={description}
          deleteHelp={deleteButton}
          onDeletePlace={deletePlace}
        />
      </Card.Footer>
        );
    }
  }

  let descriptionR = "";

  // console.log(props);

  const [deleteButton, setDeleteButton] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleClickOpen = () => {
    setTitle(props.title);
    setDescription(props.description);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteClick = () => {
    // prr.title = 'Delete '+props.title;
    setTitle("Delete " + props.title);
    // prr.description = 'Do you really wish to delete '+props.title+' ?';
    setDescription("Do you really wish to delete " + props.title + " ?");
    // prr.delete = true;
    setDeleteButton(true);
    setOpen(true);
  };

  let name = "";

  if (props.title.length > 11) {
    for (let i = 0; i < 11; i++) {
      name += props.title[i];
    }
    name += "..";
  } else {
    name = props.title;
  }

  if (props.description.length > 100) {
    for (let i = 0; i < 100; i++) {
      descriptionR += props.description[i];
    }
    descriptionR += "...";
  } else {
    descriptionR = props.description;
  }

  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  if (props.loggedIn) {
    stateTrans = {
      id: props.id,
      title: props.title,
      description: props.description,
      address: props.address,
      token: props.loggedIn.token,
    };
    caseLogIn();
  }else if(props.signUp){
    stateTrans = {
      id: props.id,
      title: props.title,
      description: props.description,
      address: props.address,
      token: props.signUp.token,
    };
    caseSignUp();
  }

  // console.log(props);

  return (
    <Container style={{ textAlign: "center" }}>
      <MuiThemeProvider theme={theme}>
        <Card
          as="li"
          style={{
            width: "90%",
            height: "5%",
            backgroundColor: "white",
            margin: "10px",
          }}
        >
          <Card.Img
            style={{ height: "25%" }}
            src={`http://localhost:5000/${props.image}`}
            alt={props.title}
          />
          <Card.Body
            onClick={() => {
              handleClickOpen();
            }}
          >
            <Typography variant="h1" gutterBottom>
              {name}
            </Typography>
            <Typography variant="h3">{props.address}</Typography>
            <Typography variant="subtitle1">{descriptionR}</Typography>
          </Card.Body>
          {footer}
        </Card>
      </MuiThemeProvider>
      {((!props.loggedIn && !props.signUp)) && (
        <Dialogs
          id={props.id}
          open={open}
          handleClose={handleClose}
          title={title}
          description={description}
        />
      )}
      {(props.loggedIn && props.loggedIn.userId !== props.creator) && (
        <Dialogs
          id={props.id}
          open={open}
          handleClose={handleClose}
          title={title}
          description={description}
        />
      )}
      {(props.signUp && props.signUp.userId !== props.creator) && (
        <Dialogs
          id={props.id}
          open={open}
          handleClose={handleClose}
          title={title}
          description={description}
        />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(PlaceItem);
