import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { green, pink, purple, yellow } from '@material-ui/core/colors';

const useStyle = makeStyles((theme) => {
  return {
    card: {
      padding: theme.spacing(3),
    },
    note: {
      border: (note) => {
        return note.category === 'todos' ? '1px solid red' : null;
      },
    },
    avatar: {
      backgroundColor: (note) => {
        switch (note.category) {
          case 'todos':
            return yellow[700];
          case 'reminders':
            return green[500];
          case 'work':
            return pink[500];
          default:
            return purple[500];
        }
      },
    },
  };
});

const NoteCard = ({ note }) => {
  const classes = useStyle(note);
  return (
    <div>
      <Card elevation={5} className={classes.note}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton>
              {' '}
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant='body1'> {note.details}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteCard;
