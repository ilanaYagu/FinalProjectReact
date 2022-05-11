import React from "react";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import UseStyles from "./styling";
import { menu } from './NavBarData'
import {
    Container,
    Box,
    ListItemText
} from "@mui/material";
import earth from '../../images/earth.png';
import { NavLink } from "react-router-dom";

export const NavBarSide = () => {
    const classes = UseStyles() as any;

    return (
        <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <Box component="div" className={classes.logo}>
                <h1>Purple Calendar</h1>
                <Container className={classes.listItemContainer}>
                    <img
                        src={earth} height="80%" width="50%"
                        alt="Manage Your Life"
                        loading="lazy"
                    />
                </Container>
            </Box>
            <Box component="div" className={classes.navBarItems}>
                <List>
                    {menu.map((menuItem) => {
                        return (
                            <ListItem button key={menuItem.title} component={NavLink} to={menuItem.path} className={classes.listItemContainer}>
                                <ListItemText className={classes.linkText} primary={<div className={classes.textInsideLink}>{menuItem.title}</div>} />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Drawer >
    );
};
