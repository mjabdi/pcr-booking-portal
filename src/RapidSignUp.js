import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import * as EmailValidator from "email-validator";
import Container from "@material-ui/core/Container";

import {
  Grid,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import clsx from "clsx";
import Copyright from "./CopyRight";

import UserService from "./services/UserService";
import { getGlobalPath } from "./GlobalPath";

import GlobalState from "./GlobalState";
import { useHistory } from "react-router-dom";
import { getMenuId } from "./MenuList";

import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${getGlobalPath("/images/bg.jpg")})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(4, 2),
    padding: theme.spacing(4, 2),
    paddingTop: "50px",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#f5f5f5",
  },

  margin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  alert: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  timeLeft: {
    color: theme.palette.secondary.main,
    marginLeft: theme.spacing(1),
    fontWeight: "500",
  },

  timeLeftThin: {
    color: theme.palette.secondary.main,
    // marginLeft: theme.spacing(1),
    fontWeight: "400",
  },

  passwordSuccess: {
    width: "100%",
    textAlign: "left",
    fontSize: "0.75rem",
    color: "#13ab0e",
    marginTop: "-10px",
  },

  passwordError: {
    width: "100%",
    textAlign: "left",
    fontSize: "0.75rem",
    color: "red",
    marginTop: "-10px",
  },

  passwordDefault: {
    width: "100%",
    textAlign: "left",
    fontSize: "0.75rem",
    color: "#999",
    marginTop: "-10px",
  },

  logoImage: {
    width: "30px",
    height: "30px",
  },

  
  appbarCenter: {
    position: "absolute",
    // width: "260px",
    top: "0px",
    left: "12%",
    // marginLeft: "-145px",
    alignItems: "center",
    justify: "center",
    display: "flex",
    backgroundColor: "#fff",
    padding: "5px 20px 15px 20px",
    borderRadius: "8px"
  },

  appbarTitle: {
    color: "#00a1c5",
    fontSize: "1.2rem",
    fontWeight: "500",
    marginRight: "10px",

    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      marginRight: "5px",
    },
  },

  SignUpLabel:{
    color : theme.palette.secondary.main,
    marginBottom: "30px",
    fontSize: "1.5rem",
    fontWeight: "400"

  },

  welcomeLabel:{
    width: "100%",
    textAlign:"center",
    fontWeight:"400",
    marginBottom:"20px",
    fontSize:"1rem",
    color: "#999"
  },

  fullnameLabel:{
    color: "#333",
    fontWeight:"500"
  },

  SignUpText:{
    fontSize:"1rem",
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight:"500"
  }

  



}));

const timeFormat = (num) => {
  const min = parseInt(num / 60);
  const seconds = num - min * 60;

  let minStr = `${min}`;
  if (minStr.length === 1) {
    minStr = `0${minStr}`;
  }

  let secondsStr = `${seconds}`;
  if (secondsStr.length === 1) {
    secondsStr = `0${secondsStr}`;
  }

  return `${minStr} : ${secondsStr}`;
};

export default function RapidSignUp() {
  const classes = useStyles();

  const [state, setState] = React.useContext(GlobalState);

  let history = useHistory();

  const [password, setPassword] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [submiting, setSubmiting] = React.useState(false);

  const [error, setError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordRepeatError, setPasswordRepeatError] = React.useState(false);

  const [successfullyFinished, setSuccessfullyFinished] = React.useState(false);

  const [linkError, setLinkError] = React.useState(false);

  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [token, setToken] = React.useState("");

  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const loadData = async () => {
      setLoaded(false);
      setError(null);
      try {
        const _token = history.location.search.substring(7);
        const usermap = await UserService.getUserMapping({ token: _token });
        if (usermap.data.status === "OK") {
          const user = usermap.data.user;
          setFullname(user.fullname);
          setEmail(user.email);
          setToken(_token);
          setLoaded(true);
        } else if (usermap.data.status === "FAILED") {
          setError(usermap.data.error);
          setLinkError(true);
          if (
            usermap.data.error.startsWith(
              "Your email address is already registered in the system"
            )
          ) {
            setState((state) => ({}));
            history.push(getGlobalPath("/login"));
          }
        } else {
          setError("An Error Occured, Please try again in a few minutes.");
        }
      } catch (err) {
        console.log(err);
        setError("An Error Occured, Please try again in a few minutes.");
      }
    };

    loadData();
  }, [history.location]);

  const validate = () => {
    let error = false;

    if (!password || password.trim().length < 1) {
      error = true;
      setPasswordError(true);
    }
    if (!passwordRepeat || passwordRepeat.trim().length < 1) {
      error = true;
      setPasswordRepeatError(true);
    }

    if (error) return false;

    if (
      password &&
      passwordRepeat &&
      password.trim() !== passwordRepeat.trim()
    ) {
      error = true;
      setPasswordError(true);
      setPasswordRepeatError(true);
      setError("Password and Repeat Password do not match");
    }

    if (error) return false;

    if (password.trim().length < 8) {
      error = true;
      setPasswordError(true);
      setPasswordRepeatError(true);
      setError("Password must be 8 or more characters in length");
    }

    return !error;
  };

  const signUp = () => {
    if (!validate()) {
      return;
    }

    setSubmiting(true);
    const payload = {
      token: token,
      password: password,
    };
    UserService.rapidSignUp(payload)
      .then((res) => {
        setSubmiting(false);
        if (res.data.status === "OK") {
          setSuccessfullyFinished(true);
          const authToken = res.data.token;
          sessionStorage.setItem("app-auth-token", authToken);

          setState((state) => ({ ...state, signedIn: true }));
          history.push(getGlobalPath(`/${getMenuId(0)}`));
        } else if (res.data.status === "FAILED") {
          setError(res.data.error);
        } else {
          setError("Sorry, something went wrong, please try again.");
        }
      })
      .catch((err) => {
        setSubmiting(false);
        console.error(err);
        setError("Sorry, something went wrong, please try again.");
      });
  };

  const passwordChanged = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setPasswordRepeatError(false);
  };

  const passwordRepeatChanged = (event) => {
    setPasswordRepeat(event.target.value);
    setPasswordError(false);
    setPasswordRepeatError(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Paper elevation={20}>
      <div className={classes.paper}>

      <div className={classes.appbarCenter}>
              <span className={classes.appbarTitle}>
                Medical Express Clinic
              </span>

              <img
                className={classes.logoImage}
                src={getGlobalPath("/images/logo.png")}
                alt="logo image"
              />
            </div>


        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          className={classes.SignUpLabel}
        >
          Sign Up
        </Typography>

        {error && !successfullyFinished && (
          <div className={classes.alert}>
            <Alert severity="error">
              {" "}
              <div style={{ lineHeight: "1.5rem", textAlign: "justify" }}>
                {error}
              </div>
              {linkError && (
                <Grid item xs={12}>
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Link href={getGlobalPath("/signup")} variant="body2">
                      {"Go to Sign-Up page"}
                    </Link>
                  </div>
                </Grid>
              )}
            </Alert>
          </div>
        )}

        {!successfullyFinished && loaded && (
          <React.Fragment>
            <div className={classes.welcomeLabel} >
              Welcome <span className={classes.fullnameLabel}> {fullname} </span>
            </div>

            <div className={classes.SignUpText}>
                  Sign up free and keep track of all your appointments with us today !
            </div>
            <div className={classes.alert}>
               <Alert severity="info">
                   Just set your password and it is done! Your username will be your email address.
              </Alert>
            </div>

            <FormControl
              fullWidth
              required
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                {" "}
                Password{" "}
              </InputLabel>
              <OutlinedInput
                error={passwordError}
                id="outlined-adornment-password"
                name="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={passwordChanged}
                autoComplete = "current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      tabindex="-1"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={100}
              />
            </FormControl>
            <div
              className={
                password?.length >= 8
                  ? classes.passwordSuccess
                  : password?.length === 0
                  ? classes.passwordDefault
                  : classes.passwordError
              }
            >
              minimum password length : 8
            </div>

            <FormControl
              fullWidth
              required
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-repeat-password">
                {" "}
                Repeat Password{" "}
              </InputLabel>
              <OutlinedInput
                error={passwordRepeatError}
                id="outlined-adornment-repeat-password"
                name="outlined-adornment-repeat-password"
                type={showPassword ? "text" : "password"}
                value={passwordRepeat}
                onChange={passwordRepeatChanged}
                autoComplete = "current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      tabindex="-1"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={150}
              />
            </FormControl>
          </React.Fragment>
        )}

        {!successfullyFinished && loaded && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={signUp}
            className={classes.submit}
          >
            Sign Up
          </Button>
        )}

        <Backdrop className={classes.backdrop} open={submiting}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <CircularProgress color="inherit" />
            </Grid>
            <Grid item>
              <span style={{ textAlign: "center", color: "#fff" }}>
                {" "}
                Please wait ...{" "}
              </span>
            </Grid>
          </Grid>
        </Backdrop>

        <Box mt={5}>
          <Copyright />
        </Box>
      </div>
      </Paper>
    </Container>
  );
}
