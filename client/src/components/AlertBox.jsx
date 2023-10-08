import { Alert, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { selectUiState, setOpenAlert } from "../redux/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const AlertBox = () => {
  const dispatch = useDispatch();
  const { openAlert } = useSelector(selectUiState);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={openAlert}>
        <Alert
          variant="outlined"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="error"
              size="small"
              onClick={() => {
                dispatch(setOpenAlert(false));
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          REQUIRED ITEMS MUST BE FILLED OUT! PLEASE GO BACK!
        </Alert>
      </Collapse>
    </Box>
  );
};

export default AlertBox;
