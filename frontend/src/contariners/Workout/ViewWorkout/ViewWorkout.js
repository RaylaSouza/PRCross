import { useStyles } from "../styles";
import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import api from '../../../services/api';

const ViewWorkout = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(moment().format("YYYY-MM-DD"));
  let elements = props.location.search.split('/');
  let [workouts, setWorkouts] = React.useState([]);

  useEffect(() => {
    getTreinos(elements[1], elements[2])    
  }, []);

  const getTreinos = (id, date) => {
    api.get(`/workout/days/` + id + "/" + date).then(res => {
      setWorkouts(res.data);
    }); 
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
    getTreinos(elements[1], moment(date._d).format("YYYY-MM-DD"))
  };

  const renderDialogNewWorkout = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Novo Treino</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormControl variant="outlined" className={classes.inputDialog}>
              <InputLabel id="demo-simple-select-outlined-label">
                Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={tipo}
                onChange={() => setTipo()}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField
              className={classes.inputDialog}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderWorkoutDay = () => {
    return (
      <Fragment>
        <h1 className={classes.title}>Treinos</h1>
        <div className={classes.flex}>
          <div className={classes.root}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="DD/MM/YYYY"
                value={selectedDate}
                onChange={date => handleDateChange(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}
            className={classes.btn}
          >
            NOVO TREINO
          </Button>
        </div>
        <Divider />
        <div className={classes.cards}>
          {workouts.map((el) => (
            <Card className={classes.card}>
              <CardActionArea
                className={
                  el.nivel === "aquecimento" ? classes.warmUp : classes.workout
                }
              >
                <CardContent>
                  <div className={classes.flex2}>
                    <h4>{el.nome}</h4>
                    <div className={classes.flex2}>
                      <p className={classes.marginRight}>Tipo:{el.tipo}</p>
                      <p className={classes.marginRight}>Tempo: {el.tempo === null ? "no cap" : el.tempo + "min"}</p>
                    </div>
                  </div>
                  <p>{el.descricao}</p>
                  <Divider />
                  <p>{el.treino}</p>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </Fragment>
    );
  };

  return (
    <>
      {renderWorkoutDay()} {renderDialogNewWorkout()}
    </>
  );
};
export default ViewWorkout;
