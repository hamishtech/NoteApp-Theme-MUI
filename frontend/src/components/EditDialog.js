import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  dialogRoot: { backgroundColor: '#f9f9f9' },
  categoryLabel: { fontSize: 15 },
});

const EditDialog = ({ open, reverseOpen, note }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={reverseOpen}
      aria-labelledby='form-dialog-title'
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: '#f9f9f9',
          boxShadow: 'none',
        },
      }}
    >
      <DialogTitle id='form-dialog-title' className={classes.dialogTitle}>
        Update your note <EditIcon />
      </DialogTitle>
      <form>
        <DialogContent>
          <TextField
            inputProps={{ style: { fontSize: 15 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
            size='medium'
            multiline={true}
            margin='normal'
            autoFocus
            variant='outlined'
            id='name'
            label='Title'
            fullWidth
            defaultValue={note.title}
          ></TextField>
          <TextField
            inputProps={{ style: { fontSize: 15 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
            variant='outlined'
            autoFocus
            margin='dense'
            id='name'
            multiline={true}
            label='Details'
            defaultValue={note.details}
            fullWidth
          />{' '}
          <FormControl className={classes.field} required variant='filled'>
            <FormLabel className={classes.categoryLabel}>
              Note Category{' '}
            </FormLabel>
            <RadioGroup
              row
              //   defaultValue={category}
              //   onChange={(e) => {
              //     setCategory(e.target.value);
              //   }}
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
        <DialogActions>
          <Button variant='outlined' color='primary' onClick={reverseOpen}>
            Cancel
          </Button>
          <Button color='primary' variant='outlined'>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDialog;
