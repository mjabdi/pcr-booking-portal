import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { ExitToAppOutlined } from "@material-ui/icons";
import { BrowserView, MobileView, isMobile } from "react-device-detect";

import { Grid, Tooltip } from "@material-ui/core";
import GlobalState from "./GlobalState";
import Menu from "./Menu";
import { getMenuContent, getMenuIndex } from "./MenuList";

import { useLocation, useHistory } from "react-router-dom";
import Copyright from "./CopyRight";
import { getGlobalPath, getMenuIdFromGlobalPath } from "./GlobalPath";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    // marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },

  appbarTitle: {
    color: "#00a1c5",
    fontSize: "1.2rem",
    fontWeight: "500",
    marginRight: "15px",
  },

  appbarCenter: {
    position: "fixed",
    width: "260px",
    top: "10px",
    left: "50%",
    marginLeft: "-130px",
    alignItems: "center",
    justify: "center",
    display: "flex"
  },

  logoImage: {
    width: "36px",
    height: "36px",
    marginLeft: "0px",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);
  const [open, setOpen] = React.useState(isMobile ? false : true);

  const [currentMenuIndex, setCurrentMenuIndex] = React.useState(0);

  const history = useHistory();

  let location = useLocation();
  React.useEffect(() => {
    const index = getMenuIndex(getMenuIdFromGlobalPath(location.pathname));
    setState((state) => ({ ...state, currentMenuIndex: index }));
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurrentMenuIndex(state.currentMenuIndex);
    if (isMobile) {
      setOpen(false);
    }
  }, [state.currentMenuIndex]);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleLogout = () => {
    localStorage.removeItem("app-auth-token");
    sessionStorage.removeItem("app-auth-token");
    setState((state) => ({ signedIn: false }));
    history.push(getGlobalPath("/login"));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: "#fff", color: "#555" }}
        position="absolute"
        className={clsx(classes.appBar, false && open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.appbarCenter}>

              {!isMobile && (
              
                  <span className={classes.appbarTitle}>
                    Medical Express Clinic
                  </span>
              
              )}
                <img
                  className={classes.logoImage}
                  src={getGlobalPath("/images/logo.png")}
                  alt="logo image"
                />
     
          </div>

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item>
              {state.userId &&
                `${state.userId.fullname}`}
            </Grid>
            <Grid item>
              <Tooltip title="Logout">
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="logout"
                  onClick={handleLogout}
                  className={clsx(classes.menuButton)}
                >
                  <ExitToAppOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />

        <Menu />
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container
          maxWidth={isMobile ? "xs" : "xl"}
          className={classes.container}
        >
          {getMenuContent(currentMenuIndex)}

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
