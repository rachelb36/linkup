import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TextField, Box, Typography, IconButton, Tooltip, Alert } from '@mui/material';
import { UPDATE_EVENT, DELETE_EVENT } from '../utils/mutations';
import { GET_ALL_EVENTS } from '../utils/queries';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../index.css';

const EditEvent = ({ eventId, handleEditModalClose }) => {
  const { loading, data } = useQuery(GET_ALL_EVENTS, {
    variables: { id: eventId },
  });

  const [updateEvent] = useMutation(UPDATE_EVENT, {
    refetchQueries: [{ query: GET_ALL_EVENTS }],
    onCompleted: () => {
      setShowSaveAlert(true); // Show success alert on save
    },
    onError: () => toast.error('Failed to update event.')
  });

  const [deleteEvent] = useMutation(DELETE_EVENT, {
    refetchQueries: [{ query: GET_ALL_EVENTS }],
    onCompleted: () => {
      toast.success('Event deleted successfully!');
      handleEditModalClose(); // Close modal after deletion
    },
    onError: () => toast.error('Failed to delete event.')
  });

  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    city: '',
    state: '',
    date: null,
    time: null,
    image: '',
  });

  const [showSaveAlert, setShowSaveAlert] = useState(false); // State for showing save success alert

  useEffect(() => {
    if (data && data.events) {
      const eventToEdit = data.events.find(event => event.id === eventId);
      if (eventToEdit) {
        setEventData({
          name: eventToEdit.name,
          description: eventToEdit.description,
          city: eventToEdit.city || '',
          state: eventToEdit.state || '',
          date: eventToEdit.date ? dayjs(eventToEdit.date) : null,
          time: eventToEdit.time ? dayjs(eventToEdit.time, 'HH:mm') : null,
          image: eventToEdit.image || '',
        });
      }
    }
  }, [data, eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleDateChange = (newDate) => {
    setEventData({ ...eventData, date: newDate });
  };

  const handleTimeChange = (newTime) => {
    setEventData({ ...eventData, time: newTime });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSaveAlert(false); // Hide previous alert if any
    const { id, ...filteredEventData } = eventData;
    try {
      await updateEvent({
        variables: {
          updateEventId: eventId,
          input: {
            ...filteredEventData,
            date: eventData.date ? eventData.date.format('YYYY-MM-DD') : '',
            time: eventData.time ? eventData.time.format('HH:mm') : '',
          },
        },
      });
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent({
          variables: { id: eventId },
        });
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '600px',
        margin: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
        <Tooltip title="Close">
          <IconButton onClick={handleEditModalClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography variant="h5" textAlign="center">
        Edit Event
      </Typography>

      {showSaveAlert && (
        <Alert severity="success" onClose={() => setShowSaveAlert(false)}>
          Event saved successfully!
        </Alert>
      )}

      <TextField
        name="name"
        label="Event Name"
        value={eventData.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="description"
        label="Event Description"
        multiline
        rows={3}
        value={eventData.description}
        onChange={handleChange}
        required
      />
      <TextField
        name="city"
        label="City"
        value={eventData.city}
        onChange={handleChange}
      />
      <TextField
        name="state"
        label="State"
        value={eventData.state}
        onChange={handleChange}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Event Date"
          value={eventData.date}
          onChange={handleDateChange}
          slotProps={{ textField: { fullWidth: true } }}
        />
        <TimePicker
          label="Event Time"
          value={eventData.time}
          onChange={handleTimeChange}
          slotProps={{ textField: { fullWidth: true } }}
        />
      </LocalizationProvider>

      <TextField
        name="image"
        label="Event Photo URL"
        value={eventData.image}
        onChange={handleChange}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Tooltip title="Save">
          <IconButton type="submit">
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default EditEvent;
