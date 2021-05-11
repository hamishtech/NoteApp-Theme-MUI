import React, { useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {
  FormControl,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { CREATE_NOTE } from '../gql/mutations';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../state/userContext';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

export default function Create() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('todos');
  const [addNote] = useMutation(CREATE_NOTE);
  const history = useHistory();
  const [_, refetch] = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === '') {
      return setTitleError(true);
    }
    if (details === '') {
      return setDetailsError(true);
    }
    if (title && details) {
      addNote({ variables: { title, details, category } }).then(() => {
        refetch();
      });
      setTitle('');
      setDetails('');
      history.push('/notes');
    }
  };

  return (
    <Container size='xl'>
      <Typography
        variant='h6'
        color='textSecondary'
        component='h2'
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          label='Note Title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          error={titleError}
        />
        <TextField
          className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label='Details'
          variant='outlined'
          color='secondary'
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category </FormLabel>
          <RadioGroup
            defaultValue={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <FormControlLabel control={<Radio />} label='Money' value='money' />
            <FormControlLabel control={<Radio />} label='Todos' value='todos' />
            <FormControlLabel
              control={<Radio />}
              label='Reminders'
              value='reminders'
            />
            <FormControlLabel control={<Radio />} label='Study' value='study' />
          </RadioGroup>
        </FormControl>

        <Button
          type='submit'
          color='secondary'
          variant='contained'
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
