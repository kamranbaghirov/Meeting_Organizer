import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function Meetings() {
  const classes = useStyles();

  const [Meeting, setMeeting] = useState([]);
  
  useEffect(() => {
    MeetingGet()
  }, [])
  
  const MeetingGet = () => {
    fetch("http://127.0.0.1:1234/meeting")
      .then(res => res.json())
      .then(
        (result) => {
          setMeeting(result)
        }
      )
  }

  const MeetingUpdate = id => {
    window.location = 'http://127.0.0.1:1234/meeting/'+id
  }

  const MeetingDelete = id => {
    var data = {
      'id': id
    }
    fetch('http://127.0.0.1:1234/meeting', {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert(result['message'])
        if (result['status'] === 'ok') {
          MeetingGet();
        }
      }
    )
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                USERS
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary">
                  CREATE
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="left">Toplanti konusu</TableCell>
                <TableCell align="left">Katilimcilar</TableCell>
                <TableCell align="left">Tarih</TableCell>
                <TableCell align="left">Baslama saati</TableCell>
                <TableCell align="center">Bitme saati</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Meeting.map((user,i) => (
                <TableRow key={i}>
                  <TableCell align="right">{user.id}</TableCell>
                  <TableCell align="left">{user.subject}</TableCell>
                  <TableCell align="left">{user.date}</TableCell>
                  <TableCell align="left">{user.start_time}</TableCell>
                  <TableCell align="left">{user.stop_time}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button onClick={() => MeetingUpdate(user.id)}>Düzenle </Button>
                      <Button onClick={() => MeetingDelete(user.id)}>Sil</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div>
    
  );
}