import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_EVENTS, GET_ALL_USERS } from '../utils/queries';
import AddEvent from './AddEvent';
import EditEvent from './EditEvent';
import { useLocation } from 'react-router-dom';
import Auth from '../utils/auth';
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
} from '@mui/material';
import MemberList from './MemberList';

const AdminPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_EVENTS);
  const { loading: usersLoading, data: usersData, error: usersError } = useQuery(GET_ALL_USERS, {
    context: { headers: { Authorization: `Bearer ${Auth.getToken()}` } },
  });

  const location = useLocation();
  const firstName = location.state?.firstName;

  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Function to open the edit modal
  const handleEditClick = (eventId) => {
    setSelectedEventId(eventId);
    setIsEditModalOpen(true);
  };

  // Function to close the edit modal
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  // Function to save changes and refresh the event list
  const handleSaveChanges = () => {
    refetch();
    handleEditModalClose();
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error.message}</p>;

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" gap={2} mt={4} mb={4}>
        <Typography variant="h5" fontStyle="normal">
          Hi {firstName}, welcome to the Admin Page!
        </Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={() => setIsAddEventModalOpen(true)}>
            Add Event
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            color="secondary"
            onClick={() => setIsUsersModalOpen(true)}
          >
            View Members
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {data.events.map((event) => {
          const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          const formattedTime = new Date(`1970-01-01T${event.time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          });

          return (
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
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {formattedDate} • {formattedTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.city}, {event.state}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" variant="outlined" onClick={() => handleEditClick(event.id)}>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Add Event Modal */}
      <Modal open={isAddEventModalOpen} onClose={() => setIsAddEventModalOpen(false)}>
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
          <AddEvent onClose={() => setIsAddEventModalOpen(false)} refetchEvents={refetch} />
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
          <EditEvent eventId={selectedEventId} handleEditModalClose={handleEditModalClose} />
        </Box>
      </Modal>

      {/* Users Modal */}
      <Modal open={isUsersModalOpen} onClose={() => setIsUsersModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <MemberList usersLoading={usersLoading} usersError={usersError} usersData={usersData} />
          <Button onClick={() => setIsUsersModalOpen(false)} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default AdminPage;
