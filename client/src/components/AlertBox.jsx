import { Alert, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

const AlertBox = ({ setOpenAlert }) => {

  useEffect(()=>{
    const timerDuration = 5000;
    const timer = setTimeout(()=>{
      setOpenAlert(false);
    }, timerDuration)

    return()=>{clearTimeout(timer)};
  },[])
  
  return (
    <Box sx={{ width: "100%" }}>
      <Alert
        variant="outlined"
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="error"
            size="small"
            onClick={() => {
              setOpenAlert(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        REQUIRED ITEMS MUST BE FILLED OUT! PLEASE GO BACK!
      </Alert>
    </Box>
  );
};

export default AlertBox;
