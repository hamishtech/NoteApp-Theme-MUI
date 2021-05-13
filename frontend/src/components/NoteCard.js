import { useApolloClient, useMutation } from '@apollo/client';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { green, pink, purple, red, yellow } from '@material-ui/core/colors';
import { DeleteOutlined } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import { DELETE_NOTE } from '../gql/mutations';
import EditDialog from './EditDialog';

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
          case 'study':
            return red[500];
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
  const [open, setOpen] = useState(false);
  const reverseOpen = () => {
    setOpen(!open);
  };

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
            <div>
              <IconButton>
                <DeleteOutlined onClick={handleDelete} />
              </IconButton>
              <IconButton>
                <EditIcon onClick={reverseOpen} />
              </IconButton>
            </div>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant='body1'> {note.details}</Typography>
        </CardContent>
      </Card>
      <EditDialog open={open} reverseOpen={reverseOpen} note={note} />
    </div>
  );
};

export default NoteCard;
