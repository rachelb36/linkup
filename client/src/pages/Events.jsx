import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Container,
  Box,
  Button,
  Modal,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GET_ALL_EVENTS, GET_ME } from '../utils/queries';
import { ADD_TO_USER_LIKES } from '../utils/mutations';
import './events.css';

const Events = () => {
  const location = useLocation();
  const firstName = location.state?.firstName || '';
  const { loading, data } = useQuery(GET_ALL_EVENTS);
  const [addToUserLikes] = useMutation(ADD_TO_USER_LIKES);
  const [favorites, setFavorites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading: userLoading, data: userData } = useQuery(GET_ME, {
    onCompleted: (data) => {
      setFavorites(data?.me?.likedEvents || []);
    }
  });

  const handleAddToUserLikes = async (eventId) => {
    try {
      const isFavorited = favorites.includes(eventId);
      const updatedFavorites = isFavorited
        ? favorites.filter((id) => id !== eventId)
        : [...favorites, eventId];
        
      setFavorites(updatedFavorites);

      if (!isFavorited) {
        const response = await addToUserLikes({
          variables: { eventId },
        });
        console.log('Add to user likes response:', response);
      } else {
        console.log(`Event with id ${eventId} already in favorites.`);
      }
    } catch (err) {
      console.error('Error adding event to user likes:', err.message || err);
      alert('An error occurred while adding the event to favorites. Please try again.');
    }
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  if (loading || userLoading) return <p>Loading events...</p>;

  const events = data?.events || [];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Hello {firstName}, here are the upcoming events!
      </Typography>
     
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleModalOpen}
        sx={{ display: 'block', mx: 'auto', mb: 4 }}
      >
        Show Favorites
      </Button>
      <Grid container spacing={4} justifyContent="center">
        {events.map((event) => {
          // Format date and time only if they exist
          const formattedDate = event.date
            ? new Date(event.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'Date not available';
          const formattedTime = event.time
            ? new Date(`1970-01-01T${event.time}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })
            : 'Time not available';

          return (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ maxWidth: 345, mx: 'auto', position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={event.image || '/placeholder-image.jpg'} // Placeholder if no image provided
                  alt={event.name}
                />
                <CardContent>
                  <Typography variant="h5">{event.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {formattedDate} • {formattedTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.city}, {event.state}
                  </Typography>
                </CardContent>
                <Box position="absolute" bottom={10} right={10}>
                  <IconButton
                    aria-label="add to likes"
                    onClick={() => handleAddToUserLikes(event.id)}
                    color="error"
                  >
                    <FavoriteIcon 
                      sx={{ color: favorites.includes(event.id) ? 'red' : 'gray' }} 
                    />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Modal for showing favorited events */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Favorite Events
          </Typography>
          <List>
            {events
              .filter((event) => favorites.includes(event.id))
              .map((event) => {
                const formattedDate = event.date
                  ? new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'Date not available';
                const formattedTime = event.time
                  ? new Date(`1970-01-01T${event.time}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                  : 'Time not available';

                return (
                  <ListItem key={event.id}>
                    <ListItemText
                      primary={event.name}
                      secondary={`${formattedDate} • ${formattedTime}`}
                    />
                    <IconButton
                      edge="end"
                      aria-label="unfavorite"
                      onClick={() => handleAddToUserLikes(event.id)}
                      color="error"
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </ListItem>
                );
              })}
          </List>
          <Button onClick={handleModalClose} variant="contained" color="primary" fullWidth>
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Events;
