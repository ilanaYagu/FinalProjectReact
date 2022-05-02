import { makeStyles, Theme, createStyles } from "@material-ui/core";

const drawerWidth = 300;
const logoHeight = 50;
const UseStyles = makeStyles((theme: Theme) =>
    createStyles({
        hide: {
            display: "none",
        },
        show: {
            display: "block"
        },
        root: {
            display: "flex"
        },
        appBar: {
            [theme.breakpoints.up("sm")]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginRight: drawerWidth
            },
            boxShadow: "none"
        },
        drawer: {
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth
            }
        },
        drawerPaper: {
            width: drawerWidth,
            //backgroundColor: "#292c34",
            textAlign: 'center',
            //borderRight: "4px solid rgb(153 145 145)"
        },
        listItem: {
            padding: 0,
            height: "5rem"
        },
        listItemTitle: {
            fontSize: "17px",
            fontWeight: "bold"
        },
        listItemIcon: {
            minWidth: "fit-content",
        },
        listItemContainer: {
            marginTop: 15,
            marginBottom: 15,
            alignItems: 'center',
            padding: 0,
            textAlign: 'center',
        },
        logo: {
            height: logoHeight,
            textAlign: 'center',
            marginTop: "30px"
        },
        navBarItems: {
            height: `calc(90% - ${logoHeight}px)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        },
        textInsideLink: {
            fontWeight: "bold"
        }
    })
);

export default UseStyles;
