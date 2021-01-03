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
import Container from "@material-ui/core/Container";
import GlobalState from "./GlobalState";
import Alert from "@material-ui/lab/Alert";
import {
  Grid,
  AppBar,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { IconButton, Toolbar } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import clsx from "clsx";
import Copyright from "./CopyRight";

import { useHistory } from "react-router-dom";
import UserService from "./services/UserService";
import { getMenuId } from "./MenuList";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/images/bg.jpg)",
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
    color: '#fff',
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  let history = useHistory();

  const [password, setPassword] = React.useState("");

  const [username, setUsername] = React.useState("");

  const [saveChecked, setSaveChecked] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false)

  const [error, setError] = React.useState(null)
  const [submiting, setSubmiting] = React.useState(false)

  const signIn = () => {

      setSubmiting(true)

      UserService.signIn({
        email: username,
        password: password
      }).then( res => {

        setSubmiting(false)
        if (res.data.status === 'OK')
        {
          setError(null)
          const token = res.data.token
          if (saveChecked) {
            localStorage.setItem("app-auth-token", token)
          } else {
            sessionStorage.setItem("app-auth-token", token)
          }

          setState((state) => ({ ...state, signedIn: true }))
          history.push(`/${getMenuId(0)}`)
        }
        else if (res.data.status === 'FAILED')
        {
          setError(res.data.error)
        }
        else
        {
          setError('Sorry, something went wrong, please try again.')
        }
      }
      ).catch(err => {
        setSubmiting(false)
        console.error(err)
        setError('Sorry, something went wrong, please try again.')
      })
  }

  const usernameChanged = (event) => {
    setUsername(event.target.value)
    setError(null)
  };

  const passwordChanged = (event) => {
    setPassword(event.target.value)
    setError(null)
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const saveCheckedChanged = (event) => {
    setSaveChecked(event.target.checked);
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
            Sign in
          </Typography>
        
           {error && (
              <div className={classes.alert}>
                  <Alert severity="error"> <div style={{lineHeight:"1.5rem", textAlign:"justify"}}>{error}</div></Alert>
              </div>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={username}
              onChange={usernameChanged}
              on
              autoFocus
            />
            <FormControl
              fullWidth
              required
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  signIn();
                }
              }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                {" "}
                Password{" "}
              </InputLabel>
              <OutlinedInput
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

            <FormControlLabel style={{textAlign:"left", width:"100%"}}
              control={<Checkbox value="remember" color="secondary" checked={saveChecked} onChange={saveCheckedChanged} />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick = {signIn}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
             
            </Grid>

            <Backdrop className={classes.backdrop} open={submiting} >
                     <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                         <Grid item>
                            <CircularProgress color="inherit" />
                         </Grid>
                         <Grid item>
                                 <span style={{textAlign:"center", color:"#fff"}}> Please wait ... </span>
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
