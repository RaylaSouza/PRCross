import React from "react";
import clsx from "clsx";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import SportsIcon from "@material-ui/icons/Sports";

import { useStyles } from "./styles";

import { useTheme } from "@material-ui/core/styles";
import { Link, Route } from "react-router-dom";
import Timer from "../../contariners/Timer/Timer";
import Profile from "../../contariners/Profile/Profile";
import Workout from "../../contariners/Workout/Workout";
import ViewWorkout from "../../contariners/Workout/ViewWorkout/ViewWorkout";

const Menu = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component={'div'} variant="h6">
            PRCross
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/" key="Timer">
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary="Timer" />
          </ListItem>
          <ListItem button component={Link} to="/profile" key="Perfil">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItem>
          <ListItem button component={Link} to="/workout" key="Workout">
            <ListItemIcon>
              <SportsIcon />
            </ListItemIcon>
            <ListItemText primary="Workout" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Route exact path="/" component={Timer} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/workout" component={Workout} />
        <Route exact path="/workout/days" component={ViewWorkout} />
      </main>
    </div>
  );
};
export default Menu;
