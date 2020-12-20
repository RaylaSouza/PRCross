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
import { useStyles } from "./styles";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import api from '../../services/api';


const Workout = () => {
  const classes = useStyles();
  const grupos = [
    { nome: "GRUPO 1", totalPessoas: 3, status: "ativo" },
    { nome: "GRUPO 2", totalPessoas: 35, status: "ativo" },
  ];

  const onClickGroup = () => {};

  useEffect(() => {
    api.get('/workout');    
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
          {grupos.map((el) => (
            <Card className={classes.card} onClick={() => onClickGroup(el)}>
              <CardActionArea component={Link} to="/workout/days">
                <CardContent>
                  <h4>{el.nome}</h4>
                  <p>Total de pessoas: {el.totalPessoas}</p>
                  <p>Status:{el.status}</p>
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
