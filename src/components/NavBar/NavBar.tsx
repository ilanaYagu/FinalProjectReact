import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Container,
  Drawer
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";

const usedStyles = makeStyles({

  navDisplayFlex: {
    display: "flex",
  },
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    width: "90px",
    color: "white"
  },
  textInsideLink: {
    fontWeight: "bold",
    fontSize: "20px !important"
  },
  navBackground: {
    backgroundColor: "#1A1D27",
    margin: "0px"
  },
  linkDashboard: {
    margin: "15px",
    marginRight: "20px"
  }
});

const navLinks = [
  { title: "Tasks", path: "/tasks" },
  { title: "Events", path: "/events" },
];

const NavBar = () => {
  const classes = usedStyles();
  return (
    <>
      <AppBar position="static" className={classes.navBackground} >
        <Toolbar>
          <Link to="/dashboard" className={classes.linkDashboard}>
            <IconButton edge="start" color="inherit" aria-label="home">
              <Home fontSize="large" />
            </IconButton>
          </Link>

          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {navLinks.map(({ title, path }) => (
              <ListItem button key={title} component={Link} to={path}>
                <ListItemText className={classes.linkText} primary={<div className={classes.textInsideLink}>{title}</div>} />
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
