import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import {
  FormControl,
  FormControlLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Switch,
  Tooltip,
} from "@material-ui/core";
import GlobalState from "./GlobalState";

import UserBookingService from "./services/UserBookingService";
import PCRBookingCard from "./PCRBookingCard";
import GynaeBookingCard from "./GynaeBookingCard";
import GPBookingCard from "./GPBookingCard";
import STDBookingCard from "./STDBookingCard";
import BloodBookingCard from "./BloodBookingCard";
import DermaBookingCard from "./DermaBookingCard";

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

  formControl: {
    marginBottom: "20px",
    minWidth: "200px",
  },
}));

export default function BookingsPreview() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const [loading, setLoading] = React.useState(false);

  const [allUserBookings, setAllUserBookings] = React.useState([]);
  const [testType, setTestType] = React.useState("all");

  const [hideCanceled, setHideCanceled] = React.useState(true);
  const hideCanceledChanged = (event) => {
    setHideCanceled(event.target.checked);
  };

  const testTypeChanged = (event) => {
    setTestType(event.target.value);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await UserBookingService.getAllUserBookings();

        setLoading(false);
        if (res.data.status === "OK") {
          setAllUserBookings(res.data.bookings);
        }
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    const loadDataWithoutRefresh = async () => {
      try {
        const res = await UserBookingService.getAllUserBookings();
        if (res.data.status === "OK") {
          setAllUserBookings(res.data.bookings);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (state.userId.email) loadData();

    const timer = setInterval(() => {
      if (state.userId.email) loadDataWithoutRefresh();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [state.userId.email]);

  const filterTests = (tests) => {
    if (testType === "all") {
      return tests.filter((test) => (hideCanceled ? !test.deleted : true));
    } else if (testType === "pcrfittofly") {
      return tests.filter(
        (test) => test.clinic === "pcr" && !test.tr && (hideCanceled ? !test.deleted : true)
      );
    } else if (testType === "pcrtesttorelease") {
      return tests.filter(
        (test) => test.clinic === "pcr" && test.tr && (hideCanceled ? !test.deleted : true)
      );
    }
    else if (testType === "gynae") {
      return tests.filter(
        (test) => test.clinic === "gynae"  && (hideCanceled ? !test.deleted : true)
      );
    }
    else if (testType === "gp") {
      return tests.filter(
        (test) => test.clinic === "gp"  && (hideCanceled ? !test.deleted : true)
      );
    }
    else if (testType === "std") {
      return tests.filter(
        (test) => test.clinic === "std"  && (hideCanceled ? !test.deleted : true)
      );
    }
    else if (testType === "blood") {
      return tests.filter(
        (test) => test.clinic === "blood"  && (hideCanceled ? !test.deleted : true)
      );
    }
    else if (testType === "derma") {
      return tests.filter(
        (test) => test.clinic === "derma"  && (hideCanceled ? !test.deleted : true)
      );
    }


  };

  return (
    <React.Fragment>
      {loading && (
        <div style={{ minHeight: "80vh" }}>
          <LinearProgress color="secondary" />
        </div>
      )}

      {!loading && (
        <Grid
          container
          justify="space-between"
          alignContent="center"
          spacing={2}
        >
          <Grid item>
            <FormControl className={classes.formControl}>
              <Select
                labelId="select-test-label"
                // variant="outlined"
                id="test-select"
                value={testType}
                onChange={testTypeChanged}
              >
                <MenuItem value={"all"}>Show All Appointments</MenuItem>
                <MenuItem value={"pcrfittofly"}>PCR Fit to Fly Test</MenuItem>
                <MenuItem value={"pcrtesttorelease"}>
                  PCR Test to Release
                </MenuItem>
                <MenuItem value={"gynae"}>
                  Gynaecologist
                </MenuItem>

                <MenuItem value={"gp"}>
                  Private GP
                </MenuItem>

                <MenuItem value={"std"}>
                  STD Check
                </MenuItem>

                <MenuItem value={"blood"}>
                  Blood Test
                </MenuItem>

                <MenuItem value={"derma"}>
                  Dermatologist
                </MenuItem>



              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={hideCanceled}
                  onChange={hideCanceledChanged}
                  color="secondary"
                  name="hide-canceled"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Hide Canceled Records"
            />
          </Grid>
        </Grid>
      )}

      <div style={{ width: "100%", minHeight: "80vh" }}>
        <Grid container spacing={3}>
          {(!filterTests(allUserBookings) ||
            filterTests(allUserBookings).length === 0) &&
            !loading && (
              <Grid container justify="center" alignContent="center">
                <Grid item>
                  <div
                    style={{
                      marginTop: "100px",
                      fontSize: "1.2rem",
                      color: "#aaa",
                      padding: "20px",
                      border: "1px solid #ddd",
                    }}
                  >
                    {" "}
                    No Records Found{" "}
                  </div>
                </Grid>
              </Grid>
            )}

          {filterTests(allUserBookings) &&
            filterTests(allUserBookings).length > 0 &&
            filterTests(allUserBookings).map((booking, index) => (
              <Grid key={`grid-item-${index}`} item xs={12} md={4} lg={6}>                
                {booking.clinic === "pcr" &&  <PCRBookingCard booking={booking} />}
                {booking.clinic === "gynae" &&  <GynaeBookingCard booking={booking} />}
                {booking.clinic === "gp" &&  <GPBookingCard booking={booking} />}
                {booking.clinic === "std" &&  <STDBookingCard booking={booking} />}
                {booking.clinic === "blood" &&  <BloodBookingCard booking={booking} />}
                {booking.clinic === "derma" &&  <DermaBookingCard booking={booking} />}

              </Grid>
            ))}
        </Grid>
      </div>
    </React.Fragment>
  );
}
