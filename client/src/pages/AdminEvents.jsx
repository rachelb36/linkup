import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_EVENTS } from '../utils/queries';
import { UPDATE_EVENT, DELETE_EVENT, ADD_EVENT } from '../utils/mutations';
import { Button, Card, CardContent, Typography, Modal, Box, TextField } from '@mui/material';
import { toast } from 'react-toastify';

const AdminEvents = () => {
  const { loading, data, refetch } = useQuery(GET_ALL_EVENTS);
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [addEvent] = useMutation(ADD_EVENT);

  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ name: '', description: '', date: '', time: '', image: '' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Open add event modal
  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  // Delete an event
  const handleDelete = async (eventId) => {
    try {
      await deleteEvent({ variables: { id: eventId } });
      toast.success("Event deleted!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete event.");
    }
  };

  // Save changes for editing an event
  const handleSaveChanges = async () => {
    try {
      await updateEvent({ variables: { updateEventId: editingEvent.id, input: editingEvent } });
      toast.success("Event updated!");
      refetch();
      setEditingEvent(null);
    } catch (error) {
      toast.error("Failed to update event.");
    }
  };

  // Add a new event
  const handleAddEvent = async () => {
    try {
      await addEvent({ variables: { input: newEvent } });
      toast.success("Event added successfully!");
      refetch();
      handleCloseAddModal();
      setNewEvent({ name: '', description: '', date: '', time: '', image: '' });
    } catch (error) {
      toast.error("Failed to add event.");
    }
  };

  if (loading) return <p>Loading events...</p>;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Admin Events</Typography>

      <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
        Add Event
      </Button>

      {data.events.map((event) => (
        <Card key={event.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            {editingEvent?.id === event.id ? (
              <>
                <TextField
                  label="Event Name"
                  value={editingEvent.name}
                  onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Description"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Date"
                  type="date"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Time"
                  type="time"
                  value={editingEvent.time}
                  onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <Button variant="contained" onClick={handleSaveChanges}>Save Changes</Button>
                <Button variant="text" onClick={() => setEditingEvent(null)}>Cancel</Button>
              </>
            ) : (
              <>
                <Typography variant="h6">{event.name}</Typography>
                <Typography variant="body2">{event.description}</Typography>
                <Button variant="text" onClick={() => setEditingEvent(event)}>Edit</Button>
                <Button variant="text" color="error" onClick={() => handleDelete(event.id)}>Delete</Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Add Event Modal */}
      <Modal open={isAddModalOpen} onClose={handleCloseAddModal}>
        <Box sx={{ ...modalStyle, maxWidth: 600, p: 4 }}>
          <Typography variant="h5">Add New Event</Typography>
          <TextField
            label="Event Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Time"
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Image URL"
            value={newEvent.image}
            onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleAddEvent} sx={{ mt: 2 }}>
            Add Event
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

// Modal styling
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
};

export default AdminEvents;

