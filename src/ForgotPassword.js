import React from "react";
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

import { useHistory } from "react-router-dom";
import UserService from "./services/UserService";
import { getGlobalPath } from "./GlobalPath";

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
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
export default function ForgotPassword() {
  const classes = useStyles();

  const [password, setPassword] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [verificationCode, setVerificationCode] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [submiting, setSubmiting] = React.useState(false);

  const [error, setError] = React.useState(null);
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordRepeatError, setPasswordRepeatError] = React.useState(false);
  const [verificationCodeError, setVerificationCodeError] = React.useState(
    false
  );

  const [successfullyFinished, setSuccessfullyFinished] = React.useState(false);

  const [timeLeft, setTimeLeft] = React.useState(0);

  const [verificationCodeSent, setVerificationCodeSent] = React.useState(false);

  const validate = () => {
    let error = false;
  
    if (
      !email ||
      email.trim().length < 1 ||
      !EmailValidator.validate(email.trim())
    ) {
      error = true;
      setEmailError(true);
    }
   
    return !error;
  };

  const validateStepTwo = () => {
    let error = false;
  
    if (!verificationCode || verificationCode.trim().length < 1) {
      setVerificationCodeError(true);
      error = true;
    }
    if (!password || password.trim().length < 1) {
      error = true;
      setPasswordError(true);
    }
    if (!passwordRepeat || passwordRepeat.trim().length < 1) {
      error = true;
      setPasswordRepeatError(true);
    }

    if (error)
        return false

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

    if (error)
     return false

    if (password.trim().length < 8) {
      error = true;
      setPasswordError(true);
      setPasswordRepeatError(true);
      setError("Password must be 8 or more characters in length");
    }

    return !error;
  };

  const MAX_TIME_OUT = 10 * 60; //seconds
  const initTimer = () => {
    setTimeLeft(MAX_TIME_OUT);
    const timer = setInterval(() => {
      setTimeLeft((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
    }, MAX_TIME_OUT * 1000 + 5000);
  };

  const resetPassword = () => {

    if (!validateStepTwo()) {
      return;
    }

    setSubmiting(true);
    const payload = {
      email: email,
      verficationCode: verificationCode,
      password: password
    };
    UserService.resetPassword(payload)
      .then((res) => {
        setSubmiting(false);
        if (res.data.status === "OK") {
          setSuccessfullyFinished(true);
        } else if (res.data.status === "FAILED") {
          setError(res.data.error);
          if (res.data.error.startsWith('Verification Code has been expired'))
          {
            setTimeLeft(0)  
          }
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

  const sendForgotPasswordEmail = () => {
   
    if (validate()) {
      setError(null);
      setSubmiting(true);
      const payload = {
        email: email
      };

      UserService.forgotPassword(payload)
        .then((res) => {
          setSubmiting(false);
          if (res.data.status === "OK") {
            setVerificationCodeSent(true);
            setVerificationCode('')
            initTimer();
          } else if (res.data.status === "FAILED") {
            setError(res.data.error);
          } else {
            setError("Sorry, something went wrong, please try again.");
          }
        })
        .catch((err) => {
          console.error(err);
          setSubmiting(false);
          setError("Sorry, something went wrong, please try again.");
        });
    }
  };


  const verificationCodeChanged = (event) => {
    setVerificationCode(event.target.value);
    setVerificationCodeError(false);
  };

 

  const emailChanged = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Your Password?
          </Typography>

          {error && !successfullyFinished && (
            <div className={classes.alert}>
              <Alert severity="error">
                {" "}
                <div style={{ lineHeight: "1.5rem", textAlign: "justify" }}>
                  {error}
                </div>
              </Alert>
            </div>
          )}

          {successfullyFinished && (
            <div className={classes.alert}>
              <Alert severity="success">
                <div
                  style={{
                    lineHeight: "2.5rem",
                    fontSize: "1rem",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Congratulations ! Your password is sucesssfully reset.
                </div>
              </Alert>
            </div>
          )}

          {verificationCodeSent && !successfullyFinished && (
            <React.Fragment>

                {!error && (timeLeft > 0) && (
                    <div className={classes.alert}>
                            <Alert severity="info">
                                <div style={{ lineHeight: "1.5rem", textAlign: "justify" }}>
                                A verification code is just sent to your email. Please check
                                your email and enter the code in the box below.
                                </div>
                            </Alert>
                    </div>
                )}



              <div style={{ width: "100%" , marginBottom:"30px", marginTop:"30px"}}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-between"
                  spacing={2}
                >
                  {timeLeft > 0 && (
                    <Grid item>
                    <span style={{ color: "#777" }}>
                         Verification Code will be expired in :{" "}
                        <span className={classes.timeLeft}>
                        {" "}
                        {timeFormat(timeLeft)}{" "}
                        </span>
                    </span>
                    </Grid>
                  )}

                {timeLeft === 0 && (
                    <Grid item>
                        <span className={classes.timeLeftThin}>
                           Verification Code has been expired!
                        </span>
                    </Grid>
                  )}


                  <Grid item xs>
                    <Button
                      size="small"
                      disabled={timeLeft > 0}
                      fullWidth
                      variant="outlined"
                      color="primary"
                      onClick={sendForgotPasswordEmail}
                    >
                      Resend NEW Code
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </React.Fragment>
          )}

          {!verificationCodeSent && !successfullyFinished && (
            
            <React.Fragment>
              
              <div style={{color:"#777", paddingTop:"30px", paddingBottom: "0px" , fontSize:"1rem", lineHeight:"1.6rem", textAlign:'justify'}}>
                  <p>To reset your password, please enter the email address you have registred with.</p>
                  <p> We will send a verification code to your email.</p>
              </div>
             

              <TextField
                disabled={verificationCodeSent}
                error={emailError}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={emailChanged}
              />

              </React.Fragment>

            )}

          {verificationCodeSent && !successfullyFinished && (
            <React.Fragment>
            <TextField
              autoFocus
              error={verificationCodeError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="verification-code-id"
              label="Verification Code"
              name="verification-code"
              autoComplete="none"
              value={verificationCode}
              onChange={verificationCodeChanged}
              helperText="Please enter the verification code that is sent to your email."
            />

            <FormControl
            
            fullWidth
            required
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              {" "}
              New Password{" "}
            </InputLabel>
            <OutlinedInput
              error={passwordError}
              id="outlined-adornment-password"
              name="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={passwordChanged}
              autoComplete="new-password"
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

          <FormControl
           
            fullWidth
            required
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              {" "}
              Repeat New Password{" "}
            </InputLabel>
            <OutlinedInput
              error={passwordRepeatError}
              id="outlined-adornment-repeat-password"
              name="outlined-adornment-repeat-password"
              type={showPassword ? "text" : "password"}
              value={passwordRepeat}
              onChange={passwordRepeatChanged}
              autoComplete="new-password"
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
              labelWidth={200}
            />
          </FormControl>

          </React.Fragment>

          )}

          {!verificationCodeSent && !successfullyFinished && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={sendForgotPasswordEmail}
              className={classes.submit}
            >
              Submit
            </Button>
          )}

          {verificationCodeSent && !successfullyFinished && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={resetPassword}
              className={classes.submit}
            >
              Submit
            </Button>
          )}

          <Grid container>
            {successfullyFinished && (
              <Grid item xs={12}>
                <div style={{ width: "100%", textAlign: "center" }}>
                  <Link href={getGlobalPath("/login")} variant="body2">
                    {"Go to Login page"}
                  </Link>
                </div>
              </Grid>
            )}

          {!successfullyFinished && (
              <Grid item>
                <Link href={getGlobalPath("/login")} variant="body2">
                  {"Back to Sign in page"}
                </Link>
              </Grid>
            )}

           
          </Grid>

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
      </Grid>
    </Grid>
  );
}
