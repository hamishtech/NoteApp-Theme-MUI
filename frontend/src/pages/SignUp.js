import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Copyright } from '../components/Copyright';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../gql/mutations';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../state/userContext';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { set } from 'date-fns/esm';

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

export default function SignUp() {
  const classes = useStyles();
  const [createUser, result] = useMutation(CREATE_USER);
  const [username, setUsername] = useState('');
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [_, refetch] = useContext(UserContext);

  console.log(window.localStorage.getItem('tokenValue'));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (username.length <= 3 || password.length <= 3) {
        setOpen(true);
        return;
      }
      createUser({ variables: { username, password } });
    } catch (error) {}
  };

  useEffect(() => {
    if (result.data) {
      window.localStorage.setItem('tokenValue', result.data.createUser.token);
      refetch();
      setTimeout(() => {
        history.push('/notes');
      }, 1000);
    }
  }, [result.data, history]);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete='fname'
                name='userName'
                variant='outlined'
                required
                onChange={({ target }) => {
                  setUsername(target.value);
                }}
                fullWidth
                error={open}
                id='userName'
                label='Username'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                error={open}
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                error={open}
                fullWidth
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert severity='error'>
          Include more than 3 characters for both your username and password
        </Alert>
      </Snackbar>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
