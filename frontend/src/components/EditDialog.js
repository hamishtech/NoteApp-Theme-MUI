import { useApolloClient, useMutation } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { EDIT_NOTE } from '../gql/mutations';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  dialogRoot: { backgroundColor: '#f9f9f9', padding: theme.spacing(2) },
  categoryLabel: { fontSize: 15 },
  actionsRoot: { gap: '10px', marginTop: '10px' },
  LabelRoot: { marginTop: '15px' },
}));

const EditDialog = ({ open, reverseOpen, note }) => {
  const [title, setTitle] = useState(note.title);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState(note.details);
  const [category, setCategory] = useState(note.category);
  const client = useApolloClient();
  const [editNote] = useMutation(EDIT_NOTE);
  const id = note.id;
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setError(false);

    if (title === '') {
      return setError(true);
    }
    if (details === '') {
      return setError(true);
    }
    if (title && details) {
      editNote({ variables: { id: id, title, details, category } }).then(() => {
        client.resetStore();
      });
      reverseOpen();
      history.push('/notes');
    }
  };

  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={reverseOpen}
      aria-labelledby='form-dialog-title'
      fullWidth
      maxWidth='md'
      classes={{ paper: classes.dialogRoot }}
    >
      <DialogTitle id='form-dialog-title'>
        <div style={{ display: 'flex' }}>
          <Typography
            variant='h6'
            component='div'
            style={{ flexGrow: 1, width: '100%', alignSelf: 'center' }}
          >
            Update your note
          </Typography>{' '}
          <IconButton onClick={reverseOpen}>
            {' '}
            <CloseIcon color='primary' />
          </IconButton>
        </div>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            size='medium'
            multiline={true}
            margin='normal'
            onChange={({ target }) => {
              setTitle(target.value);
            }}
            autoFocus
            error={error}
            variant='outlined'
            id='name'
            label='Title'
            fullWidth
            defaultValue={note.title}
          ></TextField>
          <TextField
            variant='outlined'
            autoFocus
            error={error}
            onChange={({ target }) => {
              setDetails(target.value);
            }}
            margin='dense'
            id='name'
            multiline={true}
            label='Details'
            defaultValue={note.details}
            fullWidth
          />{' '}
          <FormControl className={classes.field} required variant='filled'>
            <FormLabel
              className={classes.categoryLabel}
              classes={{ root: classes.LabelRoot }}
            >
              Note Category{' '}
            </FormLabel>
            <RadioGroup
              row
              defaultValue={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <FormControlLabel
                control={<Radio />}
                label='Money'
                value='money'
              />
              <FormControlLabel
                control={<Radio />}
                label='Todos'
                value='todos'
              />
              <FormControlLabel
                control={<Radio />}
                label='Reminders'
                value='reminders'
              />
              <FormControlLabel
                control={<Radio />}
                label='Study'
                value='study'
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions classes={{ root: classes.actionsRoot }}>
          <Button
            type='submit'
            startIcon={<DoneIcon />}
            color='primary'
            variant='contained'
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDialog;
