import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { Button, Tooltip } from "@material-ui/core";
import GlobalState from "./GlobalState";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ColorizeIcon from '@material-ui/icons/Colorize';
import TodayIcon from '@material-ui/icons/Today';
import { useHistory } from "react-router-dom";
import { getMenuId } from "./MenuList";
import { getGlobalPath } from "./GlobalPath";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
    position: "relative",

  },
  fixedHeight: {
    minHeight: 300,
    minWidth: 340,
    // maxWidth: 500
  },
  welcomeLabel: {
    color: theme.palette.primary.dark,
    fontSize: "1.2rem",
    textAlign: "left",
    lineHeight: "2.2rem",
    paddingTop: "20px",
    paddingBottom: "40px",
    paddingLeft: "5px",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "10px",
      paddingTop: "10px",
      textAlign: "center",
      paddingLeft:"0px"
    },
  
  },
  secondaryLabel:{
    color: theme.palette.secondary.main
  },

  primaryLabel:{
    color: theme.palette.primary.main
  },

  cardHeader:{
    color: theme.palette.primary.main,
    fontSize: "1.2rem",
    textAlign: "center",
    width: "100%"
  },

  cardContentP:{
    color:"#777", 
    fontSize: "1rem",
    lineHeight:"1.8rem", 
    padding: "20px",
    textAlign:"justify",
    marginBottom: "50px"
  }

}));

export default function DashboardPreview() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  let history = useHistory();

  return (
    <React.Fragment>
      <div style={{minHeight:"80vh"}}>
      <Grid container spacing={4}>

        

        <Grid item xs={12}>
         
          <div className={classes.welcomeLabel}>
             {/* <span>Welcome to </span> Medical Express Clinic <span className={classes.secondaryLabel}>Patients Portal</span>    */}
             <span style={{color:"#999"}}>Welcome <span className={classes.primaryLabel}> {`${state.userId?.fullname}!`} </span> </span>
          </div>
        
          
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper className={fixedHeightPaper}>
           <div className={classes.cardHeader}>
             <Grid container justify="center" alignItems="center" spacing={1}> 
               <Grid item>
                   <TodayIcon/>
               </Grid>
               <Grid item>  
                 <div style={{paddingBottom:"4px"}}>
                    Book a New Appointment
                 </div>                            
               </Grid>
             </Grid>            
           </div> 
            <p className={classes.cardContentP}>
              You can book a new <span>Appointment</span> online. If you have already booked with us, you don't need to fill out every information again,
              just choose your preferred date and time and your booking is done!
            </p>

            <Grid container justify="center" alignItems="center" spacing={1} style={{position:"absolute", bottom:"20px"}}> 
               <Grid item>  
                  <Button
                      color="primary"
                      fullWidth
                      variant="contained"
                      style={{ color: "#fff", width: "250px"}}
                      onClick={() =>  history.push(getGlobalPath(`/${getMenuId(1)}`))}
                    >
                      Book Now
                    </Button>               
               </Grid>
             </Grid>      
          </Paper>
        </Grid>
    
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={fixedHeightPaper}>
            <div className={classes.cardHeader}>
            <Grid container justify="center" alignItems="center" spacing={1}> 
               <Grid item>
                   <ColorizeIcon/>
               </Grid>
               <Grid item>  
                 <div style={{paddingBottom:"4px"}}>
                    My Appointments
                 </div>                            
               </Grid>
             </Grid>  
           </div> 
           <p className={classes.cardContentP}>
              We keep all your appointments and test results for you. You can see history of all your test results in one place. 
              You can also keep track of your new test status and download the lab reports anytime you need.  
            </p>

            <Grid container justify="center" alignItems="center" spacing={1} style={{position:"absolute", bottom:"20px"}}> 
               <Grid item>  
                  <Button
                      color="primary"
                      fullWidth
                      variant="contained"
                      style={{ color: "#fff",  width: "250px"}}
                      onClick={() =>  history.push(getGlobalPath(`/${getMenuId(2)}`))}
                    >
                      Go to My Appointments
                    </Button>               
               </Grid>
             </Grid>    
          </Paper>
        </Grid>
 
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={fixedHeightPaper}>
            <div className={classes.cardHeader}>
            <Grid container justify="center" alignItems="center" spacing={1}> 
               <Grid item>
                   <LockOutlinedIcon/>
               </Grid>
               <Grid item>  
                 <div style={{paddingBottom:"4px"}}>
                    Change Password
                 </div>                            
               </Grid>
             </Grid>  
            </div> 
            <p className={classes.cardContentP}>
             For security reasons, we recommend you to change your password on a regular basis (preferrably every 40 days). 
             If you forgot your password for any reason, don't worry, you can reset your password in the login page. 
            </p>

            <Grid container justify="center" alignItems="center" spacing={1} style={{position:"absolute", bottom:"20px"}}> 
               <Grid item>  
                  <Button
                      color="primary"
                      fullWidth
                      variant="contained"
                      style={{ color: "#fff", width: "250px"}}
                      onClick={() =>  history.push(getGlobalPath(`/${getMenuId(3)}`))}
                    >
                      Change My password
                    </Button>               
               </Grid>
             </Grid>    
          </Paper>
        </Grid>
      </Grid>
      </div>
    </React.Fragment>
  );
}
