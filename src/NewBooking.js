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
import PregnantWomanIcon from "@material-ui/icons/PregnantWoman";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { getGlobalPath } from "./GlobalPath";

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
    maxWidth: 450,
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  mediaGynae: {
    height: 0,
    backgroundColor: "#fff5fc",
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

  const [loading, setLoading] = React.useState(false);
  const [bookingId, setBookingId] = React.useState(null);

  const [expandedCard1, setExpandedCard1] = React.useState(false);
  const expandedCard1Clicked = () => {
    setExpandedCard1(!expandedCard1);
  };

  const [expandedCard2, setExpandedCard2] = React.useState(false);
  const expandedCard2Clicked = () => {
    setExpandedCard2(!expandedCard2);
  };

  const [expandedCard3, setExpandedCard3] = React.useState(false);
  const expandedCard3Clicked = () => {
    setExpandedCard3(!expandedCard3);
  };

  const [expandedCard4, setExpandedCard4] = React.useState(false);
  const expandedCard4Clicked = () => {
    setExpandedCard4(!expandedCard4);
  };

  useEffect(() => {
    setLoading(true);
    UserBookingService.getMostRecentBookingId()
      .then((res) => {
        setLoading(false);
        if (res.data.status === "OK") {
          setBookingId(res.data.bookingId);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, []);

  const pcrFittoFlyClicked = () => {
    let href = "https://travelpcrtest.com";
    if (bookingId) {
      href += `/id${bookingId}`;
    }

    window.open(href, "_blank");
  };

  const pcrTesttoReleaseClicked = () => {
    let href = "https://testrelease.co.uk";
    if (bookingId) {
      href += `/${bookingId}`;
    }

    window.open(href, "_blank");
  };

  const gynaeClicked = () => {
    let href =
      "https://londonmedicalclinic.co.uk/medicalexpressclinic/book/gynae";
    // if (bookingId)
    // {
    //     href += `/${bookingId}`
    // }

    window.open(href, "_blank");
  };

  const gpClicked = () => {
    let href = "https://londonmedicalclinic.co.uk/medicalexpressclinic/book/gp";
    // if (bookingId)
    // {
    //     href += `/${bookingId}`
    // }

    window.open(href, "_blank");
  };

  const stdClicked = () => {
    let href = "https://londonmedicalclinic.co.uk/medicalexpressclinic/book/std";
    // if (bookingId)
    // {
    //     href += `/${bookingId}`
    // }

    window.open(href, "_blank");
  };


  const bloodClicked = () => {
    let href = "https://londonmedicalclinic.co.uk/medicalexpressclinic/book/blood";
    // if (bookingId)
    // {
    //     href += `/${bookingId}`
    // }

    window.open(href, "_blank");
  };

  const dermaClicked = () => {
    let href = "https://londonmedicalclinic.co.uk/medicalexpressclinic/book/derma";
    // if (bookingId)
    // {
    //     href += `/${bookingId}`
    // }

    window.open(href, "_blank");
  };


  return (
    <React.Fragment>
      <div style={{ minHeight: "80vh", paddingTop: "30px" }}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="flex-start"
              spacing={10}
            >
              <Grid item>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="pcr-fit-to-fly"
                        className={classes.avatar}
                      >
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
                    image={getGlobalPath("/images/pcr-fit-fly.webp")}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textAlign: "justify", minHeight: 200 }}
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
                    {/* <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expandedCard1,
                      })}
                      onClick={expandedCard1Clicked}
                      aria-expanded={expandedCard1}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton> */}
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
                      <Avatar
                        aria-label="pcr-test-to-release"
                        className={classes.avatar}
                      >
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
                    image={getGlobalPath("/images/pcr-test-release.jpg")}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textAlign: "justify", minHeight: 200 }}
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
                    {/* <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expandedCard2,
                      })}
                      onClick={expandedCard2Clicked}
                      aria-expanded={expandedCard2}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton> */}
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

              <Grid item>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="gynae-test"
                        className={classes.avatar}
                      >
                        <PregnantWomanIcon />
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
                        Private Gynaecologist London{" "}
                      </span>
                    }
                    subheader={
                      <span className={classes.subheader}>
                        {" "}
                        £100{" "}
                        <span
                          style={{
                            color: "#999",
                            fontWeight: "400",
                            marginLeft: "10px",
                            fontSize: "0.8rem",
                          }}
                        >
                          {" "}
                          pre-payment{" "}
                        </span>{" "}
                      </span>
                    }
                  />
                  <CardMedia
                    className={classes.mediaGynae}
                    image={getGlobalPath("/images/banner-lady.png")}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textAlign: "justify", minHeight: 200 }}
                    >
                      Years of experience has made us understand that women need
                      expert gynaecology advice and skills, plus specialist care
                      is needed for different cases. Our highly experienced
                      consultant gynaecologist in London works with a team of
                      specialists, including doctors and GPs in areas like
                      mental health, fertility, cardiology, ultrasound scans,
                      and endocrinology.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ color: "#fff" }}
                      onClick={gynaeClicked}
                    >
                      Book Now
                    </Button>
                    {/* <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expandedCard3,
                      })}
                      onClick={expandedCard3Clicked}
                      aria-expanded={expandedCard3}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton> */}
                  </CardActions>
                  <Collapse in={expandedCard3} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        An essential aspect of general women's healthcare is
                        gynaecology. We are an established private gynaecology
                        clinic, situated at, 117A Harley Street, Marylebone,
                        London providing everyday services to women. Headed by a
                        team of consultants, we operate with a wealth of
                        knowledge and expertise.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        Our experience private gynaecologists treat female
                        health issues ranging from pelvic pain, early pregnancy,
                        vulval disorders, endometriosis, painful sex,
                        contraception, fertility, to general gynaecological
                        condition. Teenagers having relevant concerns can also
                        get help at our practice.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        Should an in-patient stay or surgical procedure be
                        necessary, we've got admitting rights at top private
                        London hospitals near you where this can be done. We
                        pride in our ability to provide expert care and advice
                        and be available to patients when there is any need.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>

              <Grid item>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="gp-test" className={classes.avatar}>
                        <LocalHospitalIcon />
                      </Avatar>
                    }
                    // action={
                    //   <IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    //   </IconButton>
                    // }
                    title={
                      <span className={classes.title}> Private GP London </span>
                    }
                    subheader={
                      <span className={classes.subheader}> £150 </span>
                    }
                  />
                  <CardMedia
                    className={classes.mediaGynae}
                    image={getGlobalPath("/images/private-gp-london.jpg")}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textAlign: "justify", minHeight: 200 }}
                    >
                      Our professional and experienced private GP in London
                      providing excellent and affordable GP services like all
                      common health issues and other risk factors in its initial
                      stage. After this, a consultation will be conducted by the
                      GP (General Practitioner) to go through your past and
                      present condition for proper assessment of your health{" "}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ color: "#fff" }}
                      onClick={gpClicked}
                    >
                      Book Now
                    </Button>
                    {/* <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expandedCard4,
                      })}
                      onClick={expandedCard4Clicked}
                      aria-expanded={expandedCard4}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton> */}
                  </CardActions>
                  <Collapse in={expandedCard4} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        At Medical Express Clinic, we offer flexible appointment
                        for private GP services whenever you need. With extended
                        hours and weekend opening, we are helping our patients
                        to get proper access for high-quality health care at a
                        time convenient to them. We are centrally located in
                        Harley Street and you can simply walk into our practice
                        according to your convenience, though we recommend
                        giving us a call beforehand to check our waiting time.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        We are open seven days a week with evening and home
                        visits available by special request during weekdays. You
                        can come to see our clinic for a wide range of scans and
                        diagnostic tests. Our goal is to cure you as soon as
                        possible.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        At Medical Express Clinic, our experienced private
                        doctors in London, who have a passion for helping their
                        patient, whatever their healthcare needs.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>

              <Grid item>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="gp-test" className={classes.avatar}>
                        <LocalHospitalIcon />
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
                        Private STD Check London{" "}
                      </span>
                    }
                    subheader={<span className={classes.subheader}> </span>}
                  />
                  <CardMedia
                    className={classes.mediaGynae}
                    image={getGlobalPath("/images/std-banner.jpg")}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textAlign: "justify", minHeight: 200 }}
                    >
                      We are a leading private sexual health (GUM) clinic
                      located in the heart of London. At STD Check Clinic in
                      London, we offer private STI testing and STD Screening in
                      a comfortable and safe environment where you can start an
                      open discussion with our doctors about your sexual health
                      concerns. Our clinic is staffed by doctors, nurses and
                      health care assistants who look after the sexual and
                      reproductive health of our patients with utmost care,
                      diligence and privacy.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ color: "#fff" }}
                      onClick={stdClicked}
                    >
                      Book Now
                    </Button>
                    {/* <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expandedCard4,
                      })}
                      onClick={expandedCard4Clicked}
                      aria-expanded={expandedCard4}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton> */}
                  </CardActions>
                  <Collapse in={expandedCard4} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        At Medical Express Clinic, we offer flexible appointment
                        for private GP services whenever you need. With extended
                        hours and weekend opening, we are helping our patients
                        to get proper access for high-quality health care at a
                        time convenient to them. We are centrally located in
                        Harley Street and you can simply walk into our practice
                        according to your convenience, though we recommend
                        giving us a call beforehand to check our waiting time.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        We are open seven days a week with evening and home
                        visits available by special request during weekdays. You
                        can come to see our clinic for a wide range of scans and
                        diagnostic tests. Our goal is to cure you as soon as
                        possible.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        At Medical Express Clinic, our experienced private
                        doctors in London, who have a passion for helping their
                        patient, whatever their healthcare needs.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>

              <Grid item>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="blood-test" className={classes.avatar}>
                        <LocalHospitalIcon />
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
                        Private Blood Test London{" "}
                      </span>
                    }
                    subheader={<span className={classes.subheader}> </span>}
                  />
                  <CardMedia
                    className={classes.mediaGynae}
                    image={getGlobalPath("/images/blood-test.png")}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textAlign: "justify", minHeight: 200 }}
                    >
                      Private Blood Tests London has a great reputation for delivering outstanding value for an extensive range of private blood tests in London’s Harley street. We use some of the best labs in London, and with over 1000 blood tests we can cover almost any eventuality and many of our tests’ results return within 24 hours                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ color: "#fff" }}
                      onClick={bloodClicked}
                    >
                      Book Now
                    </Button>
                    {/* <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expandedCard4,
                      })}
                      onClick={expandedCard4Clicked}
                      aria-expanded={expandedCard4}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton> */}
                  </CardActions>
                  <Collapse in={expandedCard4} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        At Medical Express Clinic, we offer flexible appointment
                        for private GP services whenever you need. With extended
                        hours and weekend opening, we are helping our patients
                        to get proper access for high-quality health care at a
                        time convenient to them. We are centrally located in
                        Harley Street and you can simply walk into our practice
                        according to your convenience, though we recommend
                        giving us a call beforehand to check our waiting time.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        We are open seven days a week with evening and home
                        visits available by special request during weekdays. You
                        can come to see our clinic for a wide range of scans and
                        diagnostic tests. Our goal is to cure you as soon as
                        possible.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        At Medical Express Clinic, our experienced private
                        doctors in London, who have a passion for helping their
                        patient, whatever their healthcare needs.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>

              <Grid item>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="derma-test" className={classes.avatar}>
                        <LocalHospitalIcon />
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
                        Private Dermatologist in London{" "}
                      </span>
                    }
                    subheader={<span className={classes.subheader}> </span>}
                  />
                  <CardMedia
                    className={classes.mediaGynae}
                    image={getGlobalPath("/images/we-can-help-you.jpeg")}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textAlign: "justify", minHeight: 200 }}
                    >
                      Clear Skin Clinic is a renowned private dermatology clinic, conveniently located at Suite G, 117A Harley Street, Marylebone, London W1G 6AT, UK. We have a team of highly experienced private dermatologist who will help to diagnose as well as treat a variety of dermatological conditions like acne, dry skin, cellulitis, genital herpes, birthmarks, rosacea, hyperhidrosis, hair loss, nail fungus, scleroderma, mole removal and other skin problems.                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ color: "#fff" }}
                      onClick={dermaClicked}
                    >
                      Book Now
                    </Button>
                    {/* <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expandedCard4,
                      })}
                      onClick={expandedCard4Clicked}
                      aria-expanded={expandedCard4}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton> */}
                  </CardActions>
                  <Collapse in={expandedCard4} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        At Medical Express Clinic, we offer flexible appointment
                        for private GP services whenever you need. With extended
                        hours and weekend opening, we are helping our patients
                        to get proper access for high-quality health care at a
                        time convenient to them. We are centrally located in
                        Harley Street and you can simply walk into our practice
                        according to your convenience, though we recommend
                        giving us a call beforehand to check our waiting time.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        We are open seven days a week with evening and home
                        visits available by special request during weekdays. You
                        can come to see our clinic for a wide range of scans and
                        diagnostic tests. Our goal is to cure you as soon as
                        possible.
                      </Typography>
                      <Typography paragraph style={{ textAlign: "justify" }}>
                        At Medical Express Clinic, our experienced private
                        doctors in London, who have a passion for helping their
                        patient, whatever their healthcare needs.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>

              {/* <Grid item> <div className={classes.root}></div> </Grid>       */}

            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
