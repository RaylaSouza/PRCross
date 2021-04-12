import React, { useEffect, useState } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from "./styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Snackbars = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => props.onClose()}>
        <Alert onClose={() => props.onClose()} severity={props.severity}>
         {props.message}
        </Alert>
      </Snackbar>
    </div> 
  );
}

export default Snackbars;