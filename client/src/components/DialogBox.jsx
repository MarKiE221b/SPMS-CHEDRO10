import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { setOpenDialog, setAgreeDialog, selectUiState } from "../redux/uiSlice";

const DialogBox = () => {
  const { openDialog } = useSelector(selectUiState);
  const dispatch = useDispatch();

  const handleAgree = () => {
    dispatch(setAgreeDialog(true));
    dispatch(setOpenDialog(false));
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={() => dispatch(setOpenDialog(false))}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"VERIFY ENTRY"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Before you proceed, please ensure that you have filled out all the
            required forms. Incomplete submissions may result in processing
            delays or other issues. Are you sure you want to submit the
            information now?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(setOpenDialog(false))}>
            Disagree
          </Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogBox;
