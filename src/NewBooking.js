import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import {
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Tooltip,
} from "@material-ui/core";
import GlobalState from "./GlobalState";

import UserBookingService from "./services/UserBookingService";
import PCRBookingCard from "./PCRBookingCard";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },

  root: {
    maxWidth: 345,
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expandOpen: {
    transform: "rotate(180deg)",
  },

  avatar: {
    backgroundColor: theme.palette.primary.main,
  },

  subheader: {
    color: theme.palette.secondary.main,
    fontWeight: "500",
  },

  title: {
    color: theme.palette.primary.main,
    fontSize: "0.95rem",
    fontWeight: "500",
    lineHeight: "1.5rem",
  },
}));

export default function NewBooking() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const [expandedCard1, setExpandedCard1] = React.useState(false);

  const [loading, setLoading] = React.useState(false)
  const [bookingId, setBookingId] = React.useState(null)

  const expandedCard1Clicked = () => {
    setExpandedCard1(!expandedCard1);
  };

  const [expandedCard2, setExpandedCard2] = React.useState(false);

  const expandedCard2Clicked = () => {
    setExpandedCard2(!expandedCard2);
  };

  useEffect( () => {

    setLoading(true)
    UserBookingService.getMostRecentBookingId().then(res => {
        setLoading(false)
        if (res.data.status === 'OK')
        {
            setBookingId(res.data.bookingId)
        }

    }).catch(err =>
        {
            setLoading(false)
            console.error(err)
        })

  }, [])


  const pcrFittoFlyClicked = () =>
  {
      let href =  'https://travelpcrtest.com'
      if (bookingId)
      {
          href += `/id${bookingId}`
      }

      window.open(href,"_blank")
  }

  const pcrTesttoReleaseClicked = () =>
  {
    let href =  'https://testrelease.co.uk'
    if (bookingId)
    {
        href += `/${bookingId}`
    }

    window.open(href,"_blank")
  }

  return (
    <React.Fragment>
      <div style={{ minHeight: "80vh", paddingTop: "30px" }}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={10}
            >
              <Grid item>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="pcr-fit-to-fly" className={classes.avatar}>
                        <AirplanemodeActiveIcon />
                      </Avatar>
                    }
                    // action={
                    //   <IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    //   </IconButton>
                    // }
                    title={
                      <span className={classes.title}>
                        {" "}
                        RT-PCR Fit to Fly Test{" "}
                      </span>
                    }
                    subheader={
                      <span className={classes.subheader}> £199 </span>
                    }
                  />
                  <CardMedia
                    className={classes.media}
                    image="/images/pcr-fit-fly.webp"
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textAlign: "justify" }}
                    >
                      In order to protect public health and prevent the spread
                      of COVID-19, many airlines will ask passengers to produce
                      negative Coronavirus swab results, before they board a
                      flight. The requirements come in the form of a test
                      result, and certificates if required, proving that person
                      has tested negative for coronavirus.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ color: "#fff" }}
                      onClick={pcrFittoFlyClicked}
                    >
                      Book Now
                    </Button>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expandedCard1,
                      })}
                      onClick={expandedCard1Clicked}
                      aria-expanded={expandedCard1}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expandedCard1} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        Medical Express Clinic provides a private PCR Swab
                        testing for COVID-19 near you that is UKAS approved.
                        Once the sample has been taken it is sent to the
                        laboratory for analysis immediately, by hand to ensure
                        the fastest result.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        We do not believe in using the Postal Service to submit
                        our samples to the laboratory, and indeed our laboratory
                        is within walking distance of our clinic. Your Covid PCR
                        swab test is guaranteed to be in the laboratory within
                        one hour of you attending the clinic.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        We are proud to say but we have tested thousands of
                        travellers and in all cases have ensured those
                        travellers have been cleared to fly. We should stress,
                        however, that we do need a test to be taken 48 hours
                        before departure so that there is enough time to get the
                        test results and issue you with your fitness to travel
                        certificate. For those who take a COVID19 PCR Swab test
                        48 hours before their departure they will receive their
                        results 24 hours before they travel.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="pcr-test-to-release" className={classes.avatar}>
                        <AccessibilityNewIcon />
                      </Avatar>
                    }
                    // action={
                    //   <IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    //   </IconButton>
                    // }
                    title={
                      <span className={classes.title}>
                        {" "}
                        RT-PCR Test to Release{" "}
                      </span>
                    }
                    subheader={
                      <span className={classes.subheader}> £250 </span>
                    }
                  />
                  <CardMedia
                    className={classes.media}
                    image="/images/pcr-test-release.jpg"
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textAlign: "justify" }}
                    >
                      The UK Coronavirus Task Force has announced that rules for
                      the current 14 day quarantine for people returning to the
                      UK from a non-travel corridor country will come to an end
                      in mid-December this year. The fourteen day quarantine
                      will be replaced with a ‘test and release’ regimen where
                      instead of quarantining for 2 weeks, after 5 days
                      quarantine, travellers can have a COVID-19 PCR test. If
                      this test is negative, they will no longer have to
                      quarantine.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ color: "#fff" }}
                      onClick={pcrTesttoReleaseClicked}
                    >
                      Book Now
                    </Button>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expandedCard2,
                      })}
                      onClick={expandedCard2Clicked}
                      aria-expanded={expandedCard2}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expandedCard2} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        Through the entire pandemic, at Medical Express Clinic
                        we have made sure that we are responsive to the changing
                        requirements that people need for travel. We are ready
                        to help clients keep to the regulations, however often
                        the situation changes. Our highly qualified team keep
                        pace with the events around the Coronavirus and our
                        clinic has successfully facilitated the travel of many
                        thousands of people.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        For people coming from countries where a 14 day
                        isolation would previously have been needed,
                        self-isolation for a five day period will be the new
                        requirement. At the end of five days a privately funded
                        COVID PCR test has to be taken. At Medical Express
                        Clinic we know that people will welcome this lesser
                        disruption and we offer our expertise in quick
                        turnaround testing to help them return to normal
                        activity as soon as possible.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        We take pride in being London’s most reliable testing
                        facility for COVID 19. Where other providers often
                        promise more than they can deliver, we ensure that our
                        clients are not left with stressful last minute anxiety
                        hoping that their tests will be through in time. Results
                        for our Test and Release service will be sent via email
                        in password protected PDF format, alongside a signed
                        certificate from our note explaining what your test
                        result means.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
