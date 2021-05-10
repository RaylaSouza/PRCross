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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Snackbar from '../../components/Snackbar/Snackbar';
import api from '../../services/api';

const Register = () => {
const classes = useStyles();
const [isCref, setIsCref] = useState();
const [nome, setNome] = useState();
const [cpf, setCpf] = useState();
const [sobrenome, setSobrenome] = useState();
const [email, setEmail] = useState();
const [senha, setSenha] = useState();
const [confirmarSenha, setConfimarSenha] = useState();
const [cref, setCref] = useState();
const [openSnackbar, setOpenSnackbar] = useState(false);
const [severity, setSeverity] = useState();
const [message, setMessage] = useState();

const handleChildClicked = () => {
    setOpenSnackbar(false);
}

const saveNewPerson = (newPerson) => {
    api.post(`/register`, newPerson).then(res => {
        if(res.data.error){
            setMessage(res.data.message);
            setSeverity('error');
            setOpenSnackbar(true);
        } else {
            setMessage("Usuário cadastrado com sucesso");
            setSeverity('success');
            setOpenSnackbar(true);
        }
      }).catch(e => {
        console.log(e);
      }); 
}


const onSavePerson = (e) => {
    e.preventDefault();
    if(senha === confirmarSenha) {
        let newPerson = {
            cpf: cpf, 
            nome: nome, 
            sobrenome: sobrenome, 
            email: email, 
            senha: senha, 
            cref: isCref === "Sim" ? cref : 'Sem CREF',
        };
        saveNewPerson(newPerson);
    } else {
        setMessage('As senhas não são iguais');
        setSeverity('error');
        setOpenSnackbar(true);
    }
  };

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

  const renderRegister = () => {
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
                <form onSubmit={(e) => onSavePerson(e)} className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"s
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="Primeiro nome"
                            onChange={event =>setNome(event.target.value)}
                            autoFocus
                            type="text"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Ultimo nome"
                            name="lastName"
                            onChange={event => setSobrenome(event.target.value)}
                            autoComplete="lname"
                            type="text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                            onChange={event => setEmail(event.target.value)}
                            type="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                        <FormLabel component="legend">Você é profissional de educação física?</FormLabel>
                        <RadioGroup aria-label="gender" name="cref" value={isCref} onChange={event => setIsCref(event.target.value)} className={classes.radio}>
                            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                            <FormControlLabel value="Não" control={<Radio />} label="Não" />
                        </RadioGroup>
                        </FormControl>
                    </Grid>
                    {isCref === 'Sim' ? 
                        <Grid item xs={12}>          
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="cref"
                                label="CREF"
                                name="cref"
                                onChange={event => setCref(event.target.value)}
                                type="number"
                            />
                        </Grid>
                    : null }
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="cpf"
                            label="CPF"
                            name="cpf"
                            autoComplete="cpf"
                            onChange={event => setCpf(event.target.value)}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={event => setSenha(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Confirmar senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={event => setConfimarSenha(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Cadastrar
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="/" variant="body2" className={classes.login}>
                        Já tem uma conta? Entrar
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
  {renderRegister()}
  {openSnackbar ? renderSnackbar(): null}
  
  </>;
};
export default Register;


