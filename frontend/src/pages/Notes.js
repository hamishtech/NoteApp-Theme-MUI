import { CircularProgress, Container } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { useHistory } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import { UserContext } from '../state/userContext';

export default function Notes() {
  const breakpoints = { default: 3, 1100: 2, 700: 1 };
  const [userContext, refetch] = useContext(UserContext);
  const history = useHistory();

  return (
    <Container>
      {userContext ? (
        <Masonry
          breakpointCols={breakpoints}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'
        >
          {userContext.getUser.notes.map((note) => {
            return (
              <div key={note.date}>
                <NoteCard variant='outlined' note={note} />
              </div>
            );
          })}
        </Masonry>
      ) : (
        <CircularProgress color='secondary' size='25px' />
      )}
    </Container>
  );
}
