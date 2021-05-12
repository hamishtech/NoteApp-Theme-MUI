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
import { useMutation } from '@apollo/client';
import { DELETE_NOTE } from '../gql/mutations';
import { GET_USER } from '../gql/queries';
import { useApolloClient } from '@apollo/client';

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
  const client = useApolloClient();
  const id = note.id;
  const [deleteNote] = useMutation(DELETE_NOTE);
  const handleDelete = () => {
    deleteNote({ variables: { id: id } }).then(() => {
      client.resetStore();
    });
  };
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
            <IconButton onClick={handleDelete}>
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
