import React, { useState } from "react";
import { useStyles } from "./styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '../../components/Snackbar/Snackbar';
import api from '../../services/api';

const Login = (props) => {
const createHistory = require("history").createBrowserHistory;
let history = createHistory();
const classes = useStyles();
const [openSnackbar, setOpenSnackbar] = useState(false);
const [severity, setSeverity] = useState();
const [message, setMessage] = useState();
const [email, setEmail] = useState();
const [senha, setSenha] = useState();

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

const getLogin = (login) => {
    api.post(`/login`, login).then(res => {
        if(res.data.error){
            setMessage(res.data.message);
            setSeverity('error');
            setOpenSnackbar(true);
        } else {
            history.push(`/timer`);
            window.location.reload(true);
        }
      }).catch(e => {
        console.log(e);
      }); 
}

const onLogin = (e) => {
    e.preventDefault();
        let login = {
            email: email, 
            senha: senha, 
        };
        getLogin(login);
  };

  const renderLogin = () => {
    return (
        <>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                   PRCross
                </Typography>
                <form className={classes.form} onSubmit={(e) => onLogin(e)}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    autoComplete="email"
                    type="email"
                    onChange={event =>setEmail(event.target.value)}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={event =>setSenha(event.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Entrar
                </Button>
                <Grid container>
                    <Grid item>
                    <Link href="/register" variant="body2">
                        {"Não tem uma conta? Cadastre-se"}
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            </Container>
        </>
    );
  };

  return <>
  {renderLogin()}
  {openSnackbar ? renderSnackbar(): null}
  </>;
};
export default Login;


