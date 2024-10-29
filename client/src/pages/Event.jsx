import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Modal,
  Box,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMutation } from '@apollo/client';
import { ADD_TO_USER_LIKES, ADD_USER_TO_EVENT } from '../utils/mutations';
import 'events.css';

const Event = ({ event }) => {
  const [open, setOpen] = useState(false);
  const [addToUserLikes] = useMutation(ADD_TO_USER_LIKES);
  const [addUserToEvent] = useMutation(ADD_USER_TO_EVENT);

  const handleLike = async () => {
    try {
      await addToUserLikes({ variables: { eventId: event.id } });
    } catch (err) {
      console.error('Error adding to likes:', err);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignUp = async () => {
    try {
      await addUserToEvent({ variables: { eventId: event.id } });
      alert('Signed up successfully!');
    } catch (err) {
      console.error('Error signing up:', err);
    }
  };

  return (
    <Box>
      <Card className='event_card'>
        <CardContent>
          <Typography variant='h6' component='div'>
            {event.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {event.description}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {new Date(event.date).toLocaleDateString()}
          </Typography>
        </CardContent>
        <IconButton
          aria-label='like'
          onClick={handleLike}
          sx={styles.likeButton}
        >
          <FavoriteIcon />
        </IconButton>
        <Button onClick={handleOpen} sx={styles.learnMore}>
          Learn More
        </Button>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modalBox}>
          <Typography variant='h4'>{event.name}</Typography>
          <Typography variant='body1' sx={{ mt: 2 }}>
            {event.description}
          </Typography>
          <Typography variant='body2' sx={{ mt: 1 }}>
            Date: {new Date(event.date).toLocaleDateString()}
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSignUp}
            sx={{ mt: 3 }}
          >
            Sign me up
          </Button>
        </Box>
      </Modal>
      </Box>
    </>
  );
};

export default Event;


