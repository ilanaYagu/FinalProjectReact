import React from "react";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { menu } from './NavBarData'
import {
    Container,
    Box,
    ListItemText
} from "@mui/material";
import earth from '../../assets/earth.png';
import { NavLink } from "react-router-dom";
import { Theme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

const drawerWidth = 300;
const logoHeight = 50;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawerPaper: {
            width: drawerWidth,
            textAlign: 'center',
        },
        listItemContainer: {
            height: "50%",
            alignItems: 'center !important',
            padding: 0,
        },
        logo: {
            height: logoHeight,
            textAlign: 'center',
            marginTop: 30
        },
        navBarItems: {
            height: `calc(90% - ${logoHeight}px) !important`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        },
        textInsideLink: {
            fontWeight: "bold",
            textAlign: "center"
        }
    })
);

export const NavSideBar = () => {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <Box className={classes.logo}>
                <h1>Purple Calendar</h1>
                <Container>
                    <img
                        src={earth} height="80%" width="50%"
                        alt="Manage Your Life"
                        loading="lazy"
                    />
                </Container>
            </Box>
            <Box className={classes.navBarItems}>
                <List>
                    {menu.map((menuItem) => {
                        return (
                            <ListItem button key={menuItem.title} component={NavLink} to={menuItem.path} className={classes.listItemContainer}>
                                <ListItemText primary={<div className={classes.textInsideLink}>{menuItem.title}</div>} />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Drawer >
    );
};
