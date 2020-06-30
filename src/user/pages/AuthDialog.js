import React from "react";
import {
  DialogTitle,
  DialogContentText,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core/";

const AuthDialog = ({
    open,
    handleClose,
    title,
    description
})=>{

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
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
          </Dialog>
        </div>
    );

}

export default AuthDialog;
