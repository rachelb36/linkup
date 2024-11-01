import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_EVENTS, GET_ALL_USERS } from '../utils/queries';
import AddEvent from './AddEvent';
import EditEvent from './EditEvent';
import { useLocation } from 'react-router-dom';
import Auth from '../utils/auth';
import '../index.css';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  Container,
  Modal,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import '../index.css';

const AdminPage = () => {
  // Query to fetch all events
  const { loading, error, data, refetch } = useQuery(GET_ALL_EVENTS);
  const location = useLocation();
  const firstName = location.state?.firstName;

  // Query to fetch all users with authorization headers
  const {
    loading: usersLoading,
    data: usersData,
    error: usersError,
  } = useQuery(GET_ALL_USERS, {
    context: {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    },
  });

  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleEditClick = (eventId) => {
    setSelectedEventId(eventId);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = () => {
    refetch(); // Refetch events after saving
    setIsEditModalOpen(false);
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error.message}</p>;

  const handleUsersModalOpen = () => setIsUsersModalOpen(true);
  const handleUsersModalClose = () => setIsUsersModalOpen(false);
  const handleAddEventModalOpen = () => setIsAddEventModalOpen(true);
  const handleAddEventModalClose = () => setIsAddEventModalOpen(false);
  const handleEditModalClose = () => setIsEditModalOpen(false);

  return (
    <Container>
      <Box display="flex" justifyContent="center" gap={2} mt={4} mb={4}>
        <Typography variant='h4'>
          Hi {firstName}, welcome to the Admin Page!
        </Typography>
        <Button variant="contained" className="dkblue_button" onClick={handleAddEventModalOpen}>
       
          Add Event
        </Button>
        <Button variant="contained" className="dkblue_button" onClick={handleUsersModalOpen}>
          View Users
        </Button>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {data.events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card sx={{ maxWidth: 345, mx: 'auto' }}>
              <CardMedia
                component="img"
                height="140"
                image={event.image || '/placeholder-image.jpg'}
                alt={event.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {event.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => handleEditClick(event.id)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Event Modal */}
      <Modal open={isAddEventModalOpen} onClose={handleAddEventModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <AddEvent onClose={handleAddEventModalClose} refetchEvents={refetch} />
          <Button color="#ff7961" onClick={handleAddEventModalClose} variant="contained" className="salmon" fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>

      {/* Edit Event Modal */}
      <Modal open={isEditModalOpen} onClose={handleEditModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <EditEvent eventId={selectedEventId} onSave={handleSaveChanges} handleEditModalClose={handleEditModalClose} />
          <Button onClick={handleEditModalClose} variant="contained" className="darkblue" fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>

      {/* Users Modal */}
      <Modal open={isUsersModalOpen} onClose={handleUsersModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Registered Users
          </Typography>
          {usersLoading ? (
            <Typography>Loading users...</Typography>
          ) : usersError ? (
            <Typography color="error">Error loading users: {usersError.message}</Typography>
          ) : (
            <List>
              {usersData?.users &&
                usersData.users.map((user) => (
                  <ListItem key={user._id}>
                    <ListItemText
                      primary={`${user.firstName} ${user.lastName}`}
                      secondary={`Email: ${user.email} | Occupation: ${user.occupation}`}
                    />
                  </ListItem>
                ))}
            </List>
          )}
          <Button onClick={handleUsersModalClose} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default AdminPage;


