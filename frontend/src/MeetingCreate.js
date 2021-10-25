import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserCreate() {
  const classes = useStyles();
  
  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      'participant': participant,
      'date': date,
      'subject': subject,
      'start_time': start_time,
      'stop_time': stop_time,
    }
    fetch('http://127.0.0.1:1234/meeting', {
      method: 'POST',
      mode: 'cors',

      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'Access-Control-Allow-Headers',
              },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert(result['message'])
        if (result['status'] === 'ok') {
          window.location.href = '/';
        }
      }
      )
  }

  const [participant, setParticipant] = useState('');
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [start_time, setStart_time] = useState('');
  const [stop_time, setStop_time] = useState('');
  return (
    <Container maxWidth="xs">
    <div className={classes.paper}>
    <Typography component="h1" variant="h5">
    User
    </Typography>
    <form className={classes.form} onSubmit={handleSubmit}>
    <Grid container spacing={2}>


    <Grid item xs={12}>
    <TextField
    variant="outlined"
    required
    fullWidth
    id="subject"
    label="Toplanti konusu"
    onChange={(e) => setSubject(e.target.value)}
    />
    </Grid>
    <Grid item xs={12}>
    <TextField
    variant="outlined"
    required
    fullWidth
    id="date"
    label="Tarih"
    onChange={(e) => setDate(e.target.value)}
    />
    </Grid>
    <Grid item xs={12}>
    <TextField
    variant="outlined"
    required
    fullWidth
    id="start_time"
    label="Baslama saati"
    onChange={(e) => setStart_time(e.target.value)}
    />
    </Grid>
    <Grid item xs={12}>
    <TextField
    variant="outlined"
    required
    fullWidth
    id="stop_time"
    label="Bitme saati"
    onChange={(e) => setStop_time(e.target.value)}
    />
    </Grid>
    <Grid item xs={12}>
    <TextField
    variant="outlined"
    required
    fullWidth
    id="participant"
    label="Katilimicilar"
    onChange={(e) => setParticipant(e.target.value)}
    />
    </Grid>
    </Grid>
    <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    className={classes.submit}
    >
    Create
    </Button>
    </form>
    </div>
    </Container>
    );
}