import React from "react";
import {
  DialogTitle,
  DialogContentText,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core/";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dialogs = ({
  id,
  open,
  handleClose,
  title,
  token,
  description,
  deleteHelp,
  onDeletePlace,
}) => {
  // console.log(open, deleteHelp);
  const place = {
    placeId: id,
    token
  };
  let buttonsRender;
  if (!deleteHelp) {
    buttonsRender = (
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
    );
  } else if(deleteHelp) {
    buttonsRender = (
      <Row style={{ marginRight: "2px" }}>
        <Link
          to="/"
        >
          <Button onClick={onDeletePlace(place)} onMouseLeave={handleClose}>
            Delete
          </Button>
        </Link>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </Row>
    );
  }
  // console.log(description);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>{buttonsRender}</DialogActions>
      </Dialog>
    </div>
  );
};

export default Dialogs;
