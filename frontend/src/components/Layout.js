import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import { format } from 'date-fns';
import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../state/userContext';
import { useApolloClient } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: { width: '100%' },
    drawer: { width: drawerWidth },
    root: { display: 'flex' },
    active: { background: '#f4f4f4' },
    title: { padding: theme.spacing(3) },
    appBar: { width: `calc(100% - ${drawerWidth}px)` },
    toolbar: { height: '90px' },
    date: { flexGrow: '1' },
    avatar: { marginRight: theme.spacing(2) },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [data, fetch] = useContext(UserContext);
  const client = useApolloClient();

  console.log(data);

  const handleLogout = () => {
    window.localStorage.removeItem('tokenValue');
    history.push('/login');
    client.resetStore();
    history.push('login');
  };

  const sideBarList = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color='secondary' />,
      path: '/notes',
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlineOutlined color='secondary' />,
      path: '/create',
    },
  ];

  return (
    <div className={classes.root}>
      {/* APP BAR */}
      <AppBar elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.date} variant='body1'>
            {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography
            variant='body1'
            component={'span'}
            className={classes.avatar}
          >
            {data ? (
              data.getUser.username
            ) : (
              <CircularProgress color='secondary' size='25px' />
            )}{' '}
          </Typography>{' '}
          <Avatar src='' className={classes.avatar} />
          <div>
            {' '}
            <Button
              variant='contained'
              color='secondary'
              onClick={handleLogout}
            >
              Logout
            </Button>{' '}
          </div>
        </Toolbar>
      </AppBar>
      {/* SIDE BAR */}
      <Drawer
        classes={{ paper: classes.drawer }}
        className={classes.drawer}
        anchor='left'
        variant='permanent'
      >
        <div>
          <Typography variant='h5' className={classes.title}>
            My Notes
          </Typography>
        </div>
        <List>
          {sideBarList.map((item) => {
            return (
              <ListItem
                key={item.text}
                className={
                  location.pathname === item.path ? classes.active : null
                }
                button
                onClick={() => {
                  history.push(item.path);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
