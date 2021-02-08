import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { Avatar, Button, Divider, Icon, IconButton, Tooltip } from "@material-ui/core";
import GlobalState from "./GlobalState";
import { fontSize, fontWeight } from "@material-ui/system";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import dateformat from "dateformat";
import { FormatDateFromString } from "./DateFormatter";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PDFService from "./services/PDFService";
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';

import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    position: "relative"
  },
  fixedHeight: {
    minHeight: 240,
    height: "100%"
  },

  title: {
    color: theme.palette.primary.main,
    fontWeight: "500",
    fontSize: "0.95rem",
    width: "100%",
  },

  titleTR: {
    color: theme.palette.primary.main,
    fontWeight: "500",
    fontSize: "0.95rem",
    width: "100%",
  },

  AirIcon: {
    marginRight: "10px",
    fontSize: "32px",
  },

  cardContent: {
    padding: "10px",
  },

  bookedStatus: {
    fontWeight: "500",
    color: theme.palette.secondary.main,
  },

  sampleTakenStatus: {
    fontWeight: "500",
    color: theme.palette.primary.main,
  },

  itemLabel: {
    color: "#777",
    marginRight: "10px",
  },

  canceledStatus: {
    fontWeight: "500",
    color: "#999",
  },

  reportSentStatus: {
    fontWeight: "500",
    color: "#32b320",
  },

  positiveStatus: {
    fontWeight: "500",
    color: "#fff",
    backgroundColor : "#e82020",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "2px",
    paddingBottom: "2px"

  },

  itemData: {
    fontWeight: "500",
    color: "#333",
  },

  checkIcon:{
    color: "#32b320",   
  },

  closeIcon:{
    color: "#e82020"
  },

  editButton:{
    position: "absolute",
    right: "10px",
    top: "10px"

  },

  editIcon: {
    color: theme.palette.secondary.main
  },

  avatar: {
    backgroundColor: theme.palette.primary.main,
    marginRight: "10px"
  },

  divider:{
    // backgroundColor: theme.palette.primary.main,
  },

}));

export default function GPBookingCard({ booking }) {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const getBookingStatus = () => {
    if (booking.deleted) {
      return (
        <React.Fragment>
          <span className={classes.itemLabel}> Status : </span>{" "}
          <span className={classes.canceledStatus}>Canceled </span>
        </React.Fragment>
      );
    } else if (booking.status === "booked") {
      return (
        <React.Fragment>
          <span className={classes.itemLabel}> Status : </span>{" "}
          <span className={classes.bookedStatus}>Booking Made </span>
        </React.Fragment>
      );
    } else if (booking.status === "patient_attended") {
      return (
        <React.Fragment>
          <span className={classes.itemLabel}> Status : </span>{" "}
          <span className={classes.sampleTakenStatus}>Patient Attended </span>
        </React.Fragment>
      );
    } 

    return "";
  }



  const getBookingRef = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Ref # : </span>{" "}
        <span className={classes.itemData}> {`${booking.bookingRef}`} </span>
    </React.Fragment>
    )
  }

  const getBookingDate = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Date : </span>{" "}
        <span className={classes.itemData}> {`${FormatDateFromString(booking.bookingDate)} , ${booking.bookingTime}`} </span>
    </React.Fragment>
    )
  }


  const getFullname = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Full Name : </span>{" "}
        <span className={classes.itemData}> {`${booking.fullname}`} </span>
    </React.Fragment>
    )
  }

  const getEmail = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Email Address : </span>{" "}
        <span className={classes.itemData}> {`${booking.email}`} </span>
    </React.Fragment>
    )
  }

  const getPhone = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Telephone : </span>{" "}
        <span className={classes.itemData}> {`${booking.phone}`} </span>
    </React.Fragment>
    )
  }

  const getService = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Service : </span>{" "}
        <span className={classes.itemData}> {`${booking.service}`} </span>
    </React.Fragment>
    )
  }

  const getNotes = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Notes : </span>{" "}
        <span className={classes.itemData}> {`${booking.notes || '-'}`} </span>
    </React.Fragment>
    )
  }

  const getFormNotification = () =>
  {
    return (
      <React.Fragment>
        <Alert severity="warning">
          <div style={{lineHeight:"1.5rem", textAlign:"center", fontWeight:"500"}}>
            Warning -  You need to complete the online Registration Form before attending the clinic !
          </div>
          <div style={{width:"100%", display:"flex", justifyContent:"center", marginTop:"10px"}}>
            <Button fullWidth variant="contained" color="secondary" onClick={openRegForm}>
              Complete Registration Form
            </Button>
          </div>
        </Alert>

    </React.Fragment>
    )
  }

  const editButtonClicked = () =>
  {
    const href = `https://londonmedicalclinic.co.uk/medicalexpressclinic/user/edit/gp/${booking._id}`
    window.open(href, "_blank")
  }

  const openRegForm = () => {
    const href = `https://londonmedicalclinic.co.uk/medicalexpressclinic/user/form/gp/${booking._id}`
    window.open(href, "_blank")
  }

  return (
    <React.Fragment>
      <Paper className={fixedHeightPaper}>
        {booking.status === "booked" && !booking.deleted && (
          <div className={classes.editButton}>
            <Tooltip title="Cancel or Modify ...">
              <IconButton onClick={editButtonClicked}>
                <EditIcon className={classes.editIcon} />
              </IconButton>
            </Tooltip>
          </div>
        )}

          <React.Fragment>
            <div className={classes.titleTR}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Avatar
                    aria-label="pcr-fit-to-fly"
                    className={classes.avatar}
                  >
                    <LocalHospitalIcon />
                  </Avatar>
                </Grid>
                <Grid item>Private GP</Grid>
              </Grid>
            </div>

            <div className={classes.cardContent}>
              <Grid
                container
                direction="row"
                justify="flext-start"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={12} md={12}>
                  {getBookingRef()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getBookingStatus()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getBookingDate()}
                </Grid>
                <Grid item xs={12}>
                  <Divider className={classes.divider} />
                </Grid>

                <Grid item xs={12} md={6}>
                  {getFullname()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getPhone()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getEmail()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getNotes()}
                </Grid>

                <Grid item xs={12}>
                  {!booking.formData && getFormNotification()}
                </Grid>

              </Grid>
            </div>
          </React.Fragment>
        
      </Paper>
    </React.Fragment>
  );
}
