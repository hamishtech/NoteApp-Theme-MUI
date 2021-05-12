import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../gql/mutations';
import { useHistory } from 'react-router-dom';
import { Copyright } from '../components/Copyright';
import { UserContext } from '../state/userContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [open, setOpen] = React.useState(false);
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setOpen(true);
    },
  });
  const history = useHistory();
  const [userContext, refetch] = useContext(UserContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length <= 3 || username.length <= 3) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
    login({ variables: { password, username } });
  };

  useEffect(() => {
    if (result.data) {
      window.localStorage.setItem('tokenValue', result.data.login.token);
      refetch();
      setTimeout(() => {
        history.push('/notes');
      }, 1000);
    }
  }, [result.data, history]);

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              error={open}
              fullWidth
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              id='email'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              error={open}
              fullWidth
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          <div className={classes.alert}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity='error'>
                Invalid login details!
              </Alert>
            </Snackbar>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
