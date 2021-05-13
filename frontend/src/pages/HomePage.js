import {
  AppBar,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage:
      'url("https://images.unsplash.com/photo-1586156926774-098f04336b57?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2767&q=80")',
  },
  title: { flexGrow: 1 },
  spaceCreator: { height: '100px', backgroundColor: 'transparent' },
  paper: {
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});

const HomePage = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title}>Hamish's Note App</Typography>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.spaceCreator}></div>
      <Grid
        xs={12}
        container
        spacing={0}
        direction='column'
        justify='center'
        style={{ minHeight: '60vh' }}
      >
        <Paper className={classes.paper} elevation={0}>
          {' '}
          <Typography variant='h2'>
            {' '}
            <pre style={{ fontFamily: 'inherit' }}></pre>Organize your notes{' '}
          </Typography>{' '}
          <Typography variant='h2'> with this Note App! </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              history.push('/login');
            }}
            style={{ marginTop: '30px' }}
          >
            Get started!{' '}
          </Button>
        </Paper>
      </Grid>
    </Container>
  );
};

export default HomePage;
