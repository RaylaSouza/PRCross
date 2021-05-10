import { useStyles } from "../styles";
import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import EditIcon from '@material-ui/icons/Edit';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import api from '../../../services/api';
import Snackbar from '../../../components/Snackbar/Snackbar';

const ViewWorkout = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tipo, setTipo] = useState('EMON');
  const [nivel, setNivel] = useState('AQUECIMENTO');
  const [selectedDate, setSelectedDate] = useState();
  const [nome, setNome] = useState('');
  const [tempo, setTempo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [treino, setTreino] = useState('');
  const [rounds, setRounds] = useState(0);
  const [descanso, setDescanso] = useState(0);
  const [ativo, setAtivo] = useState(0);
  const [idTreinoEdit, setIdTreinoEdit] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState();
  const [message, setMessage] = useState();
  const elements = props.location.search.split('/');
  const groupId = useState(elements[1]);
  const dateToday = useState(elements[2]);
  const createHistory = require("history").createBrowserHistory;
  let history = createHistory();
  let [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if(elements[0] === ""){
      history.push('/');
      window.location.reload(true);
    } else {
      setSelectedDate(moment(dateToday[0]).format());
      getTreinos(groupId, dateToday[0])    
    }
  }, []);

  const handleChildClicked = () => {
    setOpenSnackbar(false);
}

const renderSnackbar = () => {
    return (
        <>
            <Snackbar
                onClose={() => handleChildClicked()}
                severity = {severity}
                message = {message}
            />
        </>
    );
};

  const getTreinos = (id, date) => {
    api.get(`/workout/days/` + id + "/" + date).then(res => {
      setWorkouts(res.data);
    }); 
  }

  const getTreinoByID = (id) => {
    api.get(`/workout/` + id).then(res => {
      setIdTreinoEdit(res.data[0].idTreino);
      setNome(res.data[0].nome);
      setTempo(res.data[0].tempo);
      setTipo(res.data[0].tipo);
      setDescricao(res.data[0].descricao);
      setTreino(res.data[0].treino);
      setNivel(res.data[0].nivel);
      setRounds(res.data[0].rounds);
      setDescanso(res.data[0].descanso);
      setAtivo(res.data[0].ativo);
    });
  }

  const saveNewWorkout = ( newWorkout ) => {
    api.post(`/workout/days/newWorkout`, newWorkout);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = (idtreino) => {
    getTreinoByID(idtreino);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const onDeleteWorkout = (idGroup, idTreino) => {
    api.delete(`/workout/days/` + idTreino + "/" + idGroup);
    history.push(`/workout/days?/${groupId[0]}/${moment(selectedDate).format("YYYY-MM-DD")}`);
    window.location.reload(true);
  };

  const onEditWorkout = (e) => {
    e.preventDefault();
    let editTreino =  
    {
      exercicios :{
        idTreino: idTreinoEdit,
        nome: nome, 
        tempo: tempo, 
        tipo: tipo, 
        descricao: descricao, 
        treino: treino, 
        nivel: nivel,
        rounds: rounds > 0 ? rounds : 0, // inteiro
        descanso: descanso > 0 ? descanso : 0, // segundos
        ativo: ativo > 0 ? ativo : 0, // segundos
      }
    };

    api.post(`/workout/days`, editTreino).then(res => {
      if(res.data.error){
        setMessage(res.data.message);
        setSeverity('error');
        setOpenSnackbar(true);
      } else {
        history.push(`/workout/days?/${groupId[0]}/${moment(selectedDate).format("YYYY-MM-DD")}`);
        window.location.reload(true);
      }
    }).catch(e => {
      console.log(e);
    }); 
    
    handleCloseEdit(false);
  };

  const onSaveWorkout = (e) => {
    e.preventDefault();
    let newTreino =  
    {
      exercicios :{
        nome: nome, 
        tempo: tempo, // minutos
        tipo: tipo, 
        descricao: descricao, 
        treino: treino, 
        nivel: nivel,
        rounds: rounds > 0 ? rounds : 0, // inteiro
        descanso: descanso > 0 ? descanso : 0, // segundos
        ativo: ativo > 0 ? ativo : 0, // segundos
      },
      group:{
        idGroup: groupId[0],
        data: moment(selectedDate).format("YYYY-MM-DD"),
      }
    };
    history.push(`/workout/days?/${groupId[0]}/${moment(selectedDate).format("YYYY-MM-DD")}`);
    window.location.reload(true);
    saveNewWorkout(newTreino);
    handleClose(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    getTreinos(elements[1], moment(date).format("YYYY-MM-DD"));
  };

  const renderDialogEditWorkout = () => {
    return (
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" 
      >
         <form onSubmit={(e) => onEditWorkout(e)}>
          <DialogTitle id="alert-dialog-title">Edição de treino</DialogTitle>
          <DialogContent>
              <TextField
                className={classes.inputDialog}
                id="outlined-basic"
                label="NOME"
                variant="outlined"
                value= {nome}
                onChange={event => setNome(event.target.value)}
                required
              />
              <FormControl variant="outlined" className={classes.inputDialog}>
                <InputLabel htmlFor="outlined-age-native-simple">Nivel</InputLabel>
                <Select
                  native
                  onChange={event => setNivel(event.target.value)}
                  label="Nivel"
                  value={nivel}
                >
                  <option value={'AQUECIMENTO'}>AQUECIMENTO</option>
                  <option value={'TREINO'}>TREINO</option>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.inputDialog}>
                <InputLabel htmlFor="outlined-age-native-simple">Tipo</InputLabel>
                <Select
                  native
                  onChange={event => setTipo(event.target.value)}
                  label="Tipo"
                  value={tipo}
                >
                  <option value={'EMON'}>EMON</option>
                  <option value={'AMRAP'}>AMRAP</option>
                  <option value={'FOR TIME'}>FOR TIME</option>
                  <option value={'TABATA'}>TABATA</option>
                </Select>
              </FormControl>

                {tipo === 'EMON' ? renderNewEmon('edit'): null}
                {tipo === 'TABATA' ? renderNewTabata('edit'): null}
                {tipo === 'FOR TIME' ? renderNewFortime('edit'): null}
                {tipo === 'AMRAP' ? renderNewAmrap('edit'): null}

                <TextField
                    className={classes.inputDialog}
                    id="outlined-basic"
                    label="DESCRIÇÃO"
                    variant="outlined"
                    value={descricao}
                    onChange={event => setDescricao(event.target.value)}
                    required
                  />
                <TextField
                  className={classes.inputDialog}
                  id="outlined-multiline-static"
                  label="Multiline"
                  multiline
                  rows={4}
                  value={treino}
                  defaultValue="EXERCÍCIOS"
                  variant="outlined"
                  onChange={event => setTreino(event.target.value)}
                  required
                />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} color="secondary">
              Cancelar
            </Button>
            <Button type="submit" color="primary" autoFocus>
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  const renderNewEmon = (action) => {
    return (
      <>
        <div className={classes.flex3}>
          <label className={classes.labelDialog}>A CADA</label>
          <TextField
            className={classes.inputDialogInt}
            id="outlined-basic"
            label="0"
            variant="outlined"
            type="number"
            value={action === 'edit' ? tempo : null}
            onChange={event => setTempo(event.target.value)}
            required
          />
          <label className={classes.labelDialog}>MINUTOS</label>
        </div>
        <div className={classes.flex3}>
          <label className={classes.labelDialog}>E</label>
          <TextField
            className={classes.inputDialogInt}
            id="outlined-basic"
            label="0"
            variant="outlined"
            type="number"
            value={action === 'edit' ? ativo : null}
            onChange={event => setAtivo(event.target.value)}
            required
          />
          <label className={classes.labelDialog}>SEGUNDOS</label>
        </div>
        <div className={classes.flex3}>
          <label className={classes.labelDialog}>POR</label>
          <TextField
            className={classes.inputDialogInt}
            id="outlined-basic"
            label="0"
            variant="outlined"
            type="number"
            value={action === 'edit' ? rounds : null}
            onChange={event => setRounds(event.target.value)}
            required
          />
          <label className={classes.labelDialog}>ROUNDS</label>
        </div>
        <div className={classes.flex3}>
          <label className={classes.labelDialog}>E DESCANSE </label>
          <TextField
            className={classes.inputDialogInt}
            id="outlined-basic"
            label="0"
            variant="outlined"
            type="number"
            value={action === 'edit' ? descanso : null}
            onChange={event => setDescanso(event.target.value)}
            required
          />
          <label className={classes.labelDialog}>SEGUNDOS</label>
        </div>
      </>
    );
  };

  const renderNewTabata = (action) => {
    return (
      <>
      <div className={classes.flex3}>
        <label className={classes.labelDialog}>POR</label>
        <TextField
          className={classes.inputDialogInt}
          id="outlined-basic"
          label="0"
          variant="outlined"
          type="number"
          value={action === 'edit' ? rounds : null}
          onChange={event => setRounds(event.target.value)}
          required
        />
        <label className={classes.labelDialog}>ROUNDS</label>
      </div>
      <div className={classes.flex3}>
        <label className={classes.labelDialog}>FAÇA</label>
        <TextField
          className={classes.inputDialogInt}
          id="outlined-basic"
          label="0"
          variant="outlined"
          type="number"
          value={action === 'edit' ? ativo : null}
          onChange={event => setAtivo(event.target.value)}
          required
        />
        <label className={classes.labelDialog}>SEGUNDOS</label>
      </div>
      
      <div className={classes.flex3}>
        <label lassName={classes.labelDialog}>E DESCANSE </label>
        <TextField
          className={classes.inputDialogInt}
          id="outlined-basic"
          label="0"
          variant="outlined"
          type="number"
          value={action === 'edit' ? descanso : null}
          onChange={event => setDescanso(event.target.value)}
          required
        />
        <label className={classes.labelDialog}>SEGUNDOS</label>
      </div>
      </>
    );
  };

  const renderNewAmrap = (action) => {
    return (
      <>
        <div className={classes.flex3}>
          <label className={classes.labelDialog}>POR</label>
          <TextField
            className={classes.inputDialogInt}
            id="outlined-basic"
            label="0"
            variant="outlined"
            type="number"
            value={action === 'edit' ? tempo : null}
            onChange={event => setTempo(event.target.value)}
            required
          />
          <label className={classes.labelDialog}>MINUTOS</label>
        </div>
      </>
    );
  };

  const renderNewFortime = (action) => {
    return (
      <>
      <div className={classes.flex3}>
        <label className={classes.labelDialog}>FAÇA</label>
        <TextField
          className={classes.inputDialogInt}
          id="outlined-basic"
          label="0"
          variant="outlined"
          type="number"
          value={action === 'edit' ? rounds : null}
          onChange={event => setRounds(event.target.value)}
          required
        />
        <label className={classes.labelDialog}>ROUNDS</label>
      </div>
      <div className={classes.flex3}>
        <label className={classes.labelDialog}>EM</label>
        <TextField
          className={classes.inputDialogInt}
          id="outlined-basic"
          label="0"
          variant="outlined"
          type="number"
          value={action === 'edit' ? tempo : null}
          onChange={event => setTempo(event.target.value)}
          required
        />
        <label className={classes.labelDialog}>MINUTOS</label>
      </div>
      </>
    );
  };

  const renderDialogNewWorkout = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         <form onSubmit={(e) => onSaveWorkout(e)}>
          <DialogTitle id="alert-dialog-title">Novo Treino</DialogTitle>
          <DialogContent>
                <TextField
                  className={classes.inputDialog}
                  id="outlined-basic"
                  label="NOME"
                  variant="outlined"
                  onChange={event => setNome(event.target.value)}
                  required
                />
                <FormControl variant="outlined" className={classes.inputDialog}>
                  <InputLabel htmlFor="outlined-age-native-simple">Nivel</InputLabel>
                  <Select
                    native
                    onChange={event => setNivel(event.target.value)}
                    label="Nivel"
                  >
                    <option value={'AQUECIMENTO'}>AQUECIMENTO</option>
                    <option value={'TREINO'}>TREINO</option>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.inputDialog}>
                  <InputLabel htmlFor="outlined-age-native-simple">Tipo</InputLabel>
                  <Select
                    native
                    onChange={event => setTipo(event.target.value)}
                    label="Tipo"
                  >
                    <option value={'EMON'}>EMON</option>
                    <option value={'AMRAP'}>AMRAP</option>
                    <option value={'FOR TIME'}>FOR TIME</option>
                    <option value={'TABATA'}>TABATA</option>
                  </Select>
                </FormControl>

                {tipo === 'EMON' ? renderNewEmon(): null}
                {tipo === 'TABATA' ? renderNewTabata(): null}
                {tipo === 'FOR TIME' ? renderNewFortime(): null}
                {tipo === 'AMRAP' ? renderNewAmrap(): null}
                
                <div>
                  <TextField
                      className={classes.inputDialog}
                      id="outlined-basic"
                      label="DESCRIÇÃO"
                      variant="outlined"
                      onChange={event => setDescricao(event.target.value)}
                      required
                    />
                </div>
                <div>
                  <TextField
                    className={classes.inputDialog}
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="EXERCÍCIOS"
                    variant="outlined"
                    onChange={event => setTreino(event.target.value)}
                    required
                  />
                </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancelar
            </Button>
            <Button type="submit" color="primary" autoFocus>
              Salvar
            </Button>
          </DialogActions>
        </form>
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
          {workouts ? workouts.map((el, index) => (
            <Card key={index} className={classes.card}>
              <div
                className={
                  el.nivel === "AQUECIMENTO" ? classes.warmUp : classes.workout
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
                  <div className={classes.actions}>
                    <p>{el.treino}</p>
                    <div>
                      <DeleteIcon onClick={() => onDeleteWorkout(el.grupo_idGrupo, el.treino_idTreino)} className={classes.action}/>
                      <EditIcon onClick={() => handleClickOpenEdit(el.treino_idTreino)} className={classes.action}/>
                      <PlayCircleFilledWhiteIcon className={classes.action}/>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          )): null}
        </div>
      </Fragment>
    );
  };

  return (
    <>
      {renderWorkoutDay()} {open ? renderDialogNewWorkout(): null} {openEdit ? renderDialogEditWorkout() : null}
      {openSnackbar ? renderSnackbar(): null}
    </>
  );
};
export default ViewWorkout;
