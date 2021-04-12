import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  IconButton,
  InputBase,
  Paper,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from "./styles";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import api from '../../services/api';


const Workout = () => {
  const classes = useStyles();
  let [grupos, setGrupos] = React.useState([]);
  const dateToday = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    api.get('/workout').then(res => {
      setGrupos(res.data);
    });
      
  }, []);

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
          <Button variant="outlined" color="primary" className={classes.btn}>
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
                <CardContent>
                  <h4>{el.nome}</h4>
                  <div className={classes.actions}>
                    <p>Status:{el.ativo ? "Ativo" : "Desativado"}</p>
                    <DeleteIcon className={classes.action}/>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </Fragment>
    );
  };

  return <>{renderWorkout()}</>;
};
export default Workout;
