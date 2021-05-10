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
  CardActionArea,
  IconButton,
  InputBase,
  Paper,

} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid } from '@material-ui/data-grid';
import Snackbar from '../../components/Snackbar/Snackbar';
import { useStyles } from "./styles";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import api from '../../services/api';


const Workout = () => {
  const classes = useStyles();
  const [nome, setNome] = useState('');
  let [grupos, setGrupos] = useState([]);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState();
  const [message, setMessage] = useState();
  const dateToday = useState(moment().format("YYYY-MM-DD"));
  const createHistory = require("history").createBrowserHistory;
  let history = createHistory();
  const columns = [
    {
      field: 'Nome',
      headerName: 'Nome',
      sortable: true,
      width: 170,
      valueGetter: (params) =>
        `${params.getValue('nome') || ''} ${params.getValue('sobrenome') || ''}`,
    },
  ];
  

  useEffect(() => {
    api.get('/workout').then(res => {
      setGrupos(res.data);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedRows = (rows) => {
    setRowsSelected(rows);
  };

  const handleClickOpen = () => {
    setOpen(true);
    api.get('/person').then(res => {
      setRows(res.data);
      console.log(res.data);
    });
  };

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

  const saveNewGroup = ( newGroup ) => {
    api.post(`/workout/days/newGroup`, newGroup).then(res => {
      if(res.data.error){
        setMessage(res.data.message);
        setSeverity('error');
        setOpenSnackbar(true);
      } else {
        history.push(`/workout`);
        window.location.reload(true);
      }
    }).catch(e => {
      console.log(e);
    }); 
  }

  const onDeleteWorkout = (idGroup) => {
    api.delete(`/group/` + idGroup).then(res => {
      if(res.data.error){
        setMessage(res.data.message);
        setSeverity('error');
        setOpenSnackbar(true);
      } else {
        history.push(`/workout`);
        window.location.reload(true);
      }
    }).catch(e => {
      console.log(e);
    }); 
  };

  const onSaveGroup = ( e ) => {
    e.preventDefault();
    let newGroup =  
    {
      group:{
        pessoas: rowsSelected,
        nome: nome,
      }
    };
    saveNewGroup(newGroup);
    handleClose(false);
  }

  const renderDialogNewGroup = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         <form onSubmit={(e) => onSaveGroup(e)}>
          <DialogTitle id="alert-dialog-title">Novo Grupo</DialogTitle>
          <DialogContent>
                <TextField
                  className={classes.inputDialog}
                  id="outlined-basic"
                  label="NOME DO GRUPO"
                  variant="outlined"
                  value= {nome}
                  onChange={event => setNome(event.target.value)}
                  required
                />
              <DataGrid  
                className={classes.tablePerson}  
                rows={rows} columns={columns} 
                pageSize={4} 
                checkboxSelection
                required
                onSelectionModelChange={newSelection => {
                  handleSelectedRows(newSelection.selectionModel);
                }} />
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

  const renderWorkout = () => {
    return (
      <Fragment>
        <h1 className={classes.title}>Treinos</h1>
        <div className={classes.flex}>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Pesquisa"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button variant="outlined" color="primary" className={classes.btn} onClick={handleClickOpen}>
            NOVO GRUPO
          </Button>
        </div>
        <Divider />
        <div className={classes.cards}>
          {grupos.map((el, index) =>(
            <Card key={index} className={classes.card}>
              <CardActionArea 
                component={Link} 
                to={{
                  pathname: '/workout/days',
                  search: '/' + el.idGrupo + '/' + dateToday[0],
                  id: el.idGrupo,
                  date: dateToday[0]}}>
              </CardActionArea>
                <CardContent>
                  <h4>{el.nome}</h4>
                  <div className={classes.actions}>
                    <p>Status:{el.ativo ? "Ativo" : "Desativado"}</p>
                    <DeleteIcon onClick={() => onDeleteWorkout(el.idGrupo)} className={classes.action}/>
                  </div>
                </CardContent>
            </Card>
          ))}
        </div>
      </Fragment>
    );
  };

  return <>{renderWorkout()} {open ? renderDialogNewGroup(): null} {openSnackbar ? renderSnackbar(): null}</>;
};
export default Workout;
