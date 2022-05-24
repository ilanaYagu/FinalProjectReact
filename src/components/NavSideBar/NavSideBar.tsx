import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { menu } from './NavBarData'
import { Container, Box, ListItemText } from "@mui/material";
import earth from '../../assets/earth.png';
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const drawerWidth = 300;
const useStyles = makeStyles({
    drawerPaper: {
        width: drawerWidth
    },
    listItemContainer: {
        height: "80%"
    },
    logo: {
        textAlign: 'center',
        marginTop: "10%"
    },
    navBarBox: {
        marginTop: "35%"
    },
    textInsideLink: {
        fontWeight: "bold",
        textAlign: "center"
    },
    navBarList: {
        height: "80%"
    }
});

export const NavSideBar = () => {
    const classes = useStyles();
    return (
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
            <Box className={classes.logo}>
                <h1>Purple Calendar</h1>
                <Container>
                    <img src={earth} height="80%" width="50%" alt="Manage Your Life" loading="lazy" />
                </Container>
            </Box>
            <Box className={classes.navBarBox}>
                <List className={classes.navBarList}>
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
