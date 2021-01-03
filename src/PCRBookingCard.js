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

export default function PCRBookingCard({ booking }) {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const downloadLabResults = (id) =>
  {
       PDFService.downloadPdfResult(id).then( (res) => 
       {       
         const file = new Blob(
           [res.data], 
           {type: 'application/pdf'});

         const fileURL = URL.createObjectURL(file);   
         window.open(fileURL, "_blank");

       

       }).catch( (err) =>
       {
           console.log(err);
       });
  }

  const downloadCertificate = (id) =>
  {
       PDFService.downloadPdfCert(id).then( (res) => 
       {
         const file = new Blob(
           [res.data], 
           {type: 'application/pdf'});

         const fileURL = URL.createObjectURL(file);   
         window.open(fileURL, "_blank");
     
       }).catch( (err) =>
       {
           console.log(err);
       });
  }

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
    } else if (booking.status === "sample_taken") {
      return (
        <React.Fragment>
          <span className={classes.itemLabel}> Status : </span>{" "}
          <span className={classes.sampleTakenStatus}>Sample Taken </span>
        </React.Fragment>
      );
    } else if (booking.status === "report_sent") {
      return (
        <React.Fragment>
         
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
               <span className={classes.itemLabel}> Status : </span>
            </Grid>
            <Grid item>
              <span className={classes.reportSentStatus}>Report Sent</span>
            </Grid>
            <Grid item>
              <CheckIcon className={classes.checkIcon} />
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
    else if (booking.status === "report_cert_sent") {
      return (
        <React.Fragment>
            
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <span className={classes.itemLabel}> Status : </span>
            </Grid>
            <Grid item>
              <span className={classes.reportSentStatus}>{`Report & Certificate Sent`}</span>
            </Grid>
            <Grid item>
              <CheckIcon className={classes.checkIcon} />
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
    else if (booking.status === "positive") {
      return (
        <React.Fragment>
          <span className={classes.itemLabel}> Status : </span>{" "}
          <span className={classes.positiveStatus}>Positive</span>
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

  const getGender = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Gender : </span>{" "}
        <span className={classes.itemData}> {`${booking.gender}`} </span>
    </React.Fragment>
    )
  }

  const getTitle = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Title : </span>{" "}
        <span className={classes.itemData}> {`${booking.title}`} </span>
    </React.Fragment>
    )
  }

  const getForename = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Forename : </span>{" "}
        <span className={classes.itemData}> {`${booking.forename}`} </span>
    </React.Fragment>
    )
  }

  const getSurname = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Surname : </span>{" "}
        <span className={classes.itemData}> {`${booking.surname}`} </span>
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

  const getPostCode = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Post Code : </span>{" "}
        <span className={classes.itemData}> {`${booking.postCode}`} </span>
    </React.Fragment>
    )
  }

  const getAddress = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Address : </span>{" "}
        <span className={classes.itemData}> {`${booking.address}`} </span>
    </React.Fragment>
    )
  }

  const getPostCodeIsolate = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Self-Isolate Post Code : </span>{" "}
        <span className={classes.itemData}> {`${booking.postCodeSI}`} </span>
    </React.Fragment>
    )
  }

  const getAddressIsolate = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Self-Isolate Address : </span>{" "}
        <span className={classes.itemData}> {`${booking.addressSI}`} </span>
    </React.Fragment>
    )
  }

  const getBirthDate = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Date of Birth : </span>{" "}
        <span className={classes.itemData}> {`${FormatDateFromString(booking.birthDate)}`} </span>
    </React.Fragment>
    )
  }

  const getPassportNumber = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Passport Number : </span>{" "}
        {!booking.passportNumber2 && (
              <span className={classes.itemData}> {`${booking.passportNumber || '-'}`} </span>
        )}
        {booking.passportNumber && booking.passportNumber2 && (
              <span className={classes.itemData}> {`${booking.passportNumber} / ${booking.passportNumber2}`} </span>
        )}
       
    </React.Fragment>
    )
  }

  const getNHSNumber = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> NHS Number : </span>{" "}
        <span className={classes.itemData}> {`${booking.NHSNumber || '-'}`} </span>
    </React.Fragment>
    )
  }

  const getEthinicity = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Ethnicity : </span>{" "}
        <span className={classes.itemData}> {`${booking.ethnicity}`} </span>
    </React.Fragment>
    )
  }

  const getArrivalDate = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Arrival Date: </span>{" "}
        <span className={classes.itemData}> {`${booking.arrivalDate}`} </span>
    </React.Fragment>
    )
  }

  const getFlightNumber = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Flight Number: </span>{" "}
        <span className={classes.itemData}> {`${booking.flightNumber}`} </span>
    </React.Fragment>
    )
  }

  const getLastDepartedDate = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Last Departure Date: </span>{" "}
        <span className={classes.itemData}> {`${booking.lastDepartedDate}`} </span>
    </React.Fragment>
    )
  }

  const getTravellingFrom = () =>
  {
    return (
      <React.Fragment>
        <span className={classes.itemLabel}> Travelling From: </span>{" "}
        <span className={classes.itemData}> {`${booking.travellingFrom}`} </span>
    </React.Fragment>
    )
  }

  const getCertificate = () =>
  {
    return (
      <React.Fragment>
        <Grid container alignItems="center">
          <Grid item>
            <span className={classes.itemLabel}>
              {" "}
              Request for Certificate:{" "}
            </span>{" "}
          </Grid>
          <Grid item>
            <span className={classes.itemData}>
              {booking.certificate ? (
                <CheckIcon className={classes.checkIcon} />
              ) : (
                <CloseIcon className={classes.closeIcon} />
              )}
            </span>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  const getAntiBodyTest = () =>
  {
    return (
      <React.Fragment>
        <Grid container alignItems="center">
          <Grid item>
            <span className={classes.itemLabel}>
              {" "}
              Request for Antibody Test:{" "}
            </span>{" "}
          </Grid>
          <Grid item>
            <span className={classes.itemData}>
              {booking.getAntiBodyTest ? (
                <CheckIcon className={classes.checkIcon} />
              ) : (
                <CloseIcon className={classes.closeIcon} />
              )}
            </span>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  const editButtonClicked = () =>
  {
    const href = `https://travelpcrtest.com/user/edit/${booking.bookingRef}-${booking.birthDate}`
    window.open(href, "_blank")
  }

  return (
    <React.Fragment>
      <Paper className={fixedHeightPaper}>
        {booking.status === "booked" && !booking.deleted && (
          <div className={classes.editButton}>
            <Tooltip title="Modify or Cancel...">
              <IconButton onClick={editButtonClicked}>
                <EditIcon className={classes.editIcon} />
              </IconButton>
            </Tooltip>
          </div>
        )}

        {booking.tr && (
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
                    <AccessibilityNewIcon />
                  </Avatar>
                </Grid>
                <Grid item>PCR Test to Release</Grid>
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
                  {getGender()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getTitle()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getForename()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getSurname()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getBirthDate()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getPassportNumber()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getEmail()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getPhone()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getPostCode()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getAddress()}
                </Grid>
                {booking.selfIsolate && (
                  <React.Fragment>
                    <Grid item xs={12} md={6}>
                      {getPostCodeIsolate()}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {getAddressIsolate()}
                    </Grid>
                  </React.Fragment>
                )}
                <Grid item xs={12} md={6}>
                  {getNHSNumber()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getEthinicity()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getArrivalDate()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getFlightNumber()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getTravellingFrom()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getLastDepartedDate()}
                </Grid>

                {(booking.status === "report_cert_sent" ||
                  booking.status === "positive" ||
                  booking.status === "inconclusive") && (
                  <React.Fragment>
                    <Grid item xs={12} md={6}>
                      <Button
                        style={{ marginTop: "10px" }}
                        startIcon={<PrintIcon />}
                        type="button"
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          downloadLabResults(booking._id);
                        }}
                        className={classes.DownloadForm}
                      >
                        Download Lab Results
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button
                        style={{ marginTop: "10px" }}
                        startIcon={<PrintIcon />}
                        type="button"
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          downloadCertificate(booking._id);
                        }}
                        className={classes.DownloadForm}
                      >
                        Download Certificate
                      </Button>
                    </Grid>
                  </React.Fragment>
                )}
              </Grid>
            </div>
          </React.Fragment>
        )}

        {!booking.tr && (
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
                    <AirplanemodeActiveIcon />
                  </Avatar>
                </Grid>
                <Grid item>PCR Fit to Fly Test</Grid>
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
                  {getGender()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getTitle()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getForename()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getSurname()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getBirthDate()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getPassportNumber()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getEmail()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getPhone()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getPostCode()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getAddress()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getCertificate()}
                </Grid>
                <Grid item xs={12} md={6}>
                  {getAntiBodyTest()}
                </Grid>
                {(booking.status === "report_cert_sent" ||
                  booking.status === "report_sent" ||
                  booking.status === "positive" ||
                  booking.status === "inconclusive") && (
                  <React.Fragment>
                    <Grid item xs={12} md={6}>
                      <Button
                        style={{ marginTop: "10px" }}
                        startIcon={<PrintIcon />}
                        type="button"
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          downloadLabResults(booking._id);
                        }}
                        className={classes.DownloadForm}
                      >
                        Download Lab Results
                      </Button>
                    </Grid>
                    {booking.status !== "report_sent" && (
                      <Grid item xs={12} md={6}>
                        <Button
                          style={{ marginTop: "10px" }}
                          startIcon={<PrintIcon />}
                          type="button"
                          fullWidth
                          variant="outlined"
                          color="secondary"
                          onClick={() => {
                            downloadCertificate(booking._id);
                          }}
                          className={classes.DownloadForm}
                        >
                          Download Certificate
                        </Button>
                      </Grid>
                    )}
                  </React.Fragment>
                )}
              </Grid>
            </div>
          </React.Fragment>
        )}
      </Paper>
    </React.Fragment>
  );
}
