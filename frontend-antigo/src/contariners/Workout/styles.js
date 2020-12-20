import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "80%",
    marginRight: "10px",
  },

  btn: {
    width: "20%",
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  inputDialog: {
    marginBottom: "15px",
    width: "100%",
  },

  iconButton: {
    padding: 10,
  },

  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    width: "100%",
  },

  flex2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  marginRight: {
    marginRight: "10px",
  },

  cards: {
    marginTop: "10px",
    alignItems: "center",
  },
  card: {
    minWidth: "50px",
    marginBottom: "10px",
  },

  warmUp: {
    borderLeft: "2px solid blue",
  },

  workout: {
    borderLeft: "2px solid green",
  },
}));
