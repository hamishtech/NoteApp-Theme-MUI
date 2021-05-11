import { Link, Typography } from '@material-ui/core';
import React from 'react';

export function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        HB-Technology{' '}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
