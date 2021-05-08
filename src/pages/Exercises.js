import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

import Select from "@material-ui/core/Select";

export default function Exercises() {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  React.useEffect(() => {
    axios
      .get("https://fitness-tracker-mern.herokuapp.com/users")
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username));
          setUsername(response.data[0].username);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    axios
      .post(
        "https://fitness-tracker-mern.herokuapp.com/exercises/add/",
        exercise
      )
      .then((res) => console.log(res.data));

    setUsername("");
    setDescription("");
    setDuration("");
    setDate("");
  };
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Fitkit
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Record Fitness Activity
          </Typography>
          <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Select
                  required
                  className="form-control"
                  value={username}
                  fullWidth
                  onChange={onChangeUsername}
                >
                  {users.map((user) => {
                    return (
                      <option key={user} value={user}>
                        {user}
                      </option>
                    );
                  })}
                </Select>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Enter the activity name"
                  fullWidth
                  autoComplete="shipping address-line1"
                  value={description}
                  onChange={onChangeDescription}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Enter duration(in minutes)"
                  fullWidth
                  autoComplete="shipping address-line1"
                  value={duration}
                  onChange={onChangeDuration}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={date}
                  onChange={onChangeDate}
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Add Record
              </Button>
            </Grid>
          </form>
        </Paper>
      </main>
      <Copyright />
    </React.Fragment>
  );
}
