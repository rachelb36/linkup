import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TextField, Button, Box, Typography } from '@mui/material';
import { UPDATE_EVENT, DELETE_EVENT } from '../utils/mutations'; 
import { GET_ALL_EVENTS } from '../utils/queries';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../index.css';

const EditEvent = ({ eventId, handleEditModalClose }) => {
  const { loading, data } = useQuery(GET_ALL_EVENTS, {
    variables: { id: eventId },
  });

  const [updateEvent, { error: updateError }] = useMutation(UPDATE_EVENT);
  const [deleteEvent, { error: deleteError }] = useMutation(DELETE_EVENT, {
    refetchQueries: [{ query: GET_ALL_EVENTS }],
    onCompleted: () => {
      handleEditModalClose()
      toast.success('Event deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete event.');
    }
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
    try {
      const { __typename, id, ...filteredEventData } = eventData;
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
      toast.success('Event updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Failed to update event.');
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
        gap: 3,
        maxWidth: '600px',
        margin: 'auto',
        mt: 5,
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center">
        Edit Event
      </Typography>
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
        rows={4}
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
      <Button type="submit" variant="contained" color="#0d1e30">
        Update Event
      </Button>
      <Button
        onClick={handleDelete}
        variant="contained"
        sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
      >
        Delete Event
      </Button>
      {/* {(updateError || deleteError) && (
        <Typography className="salmon">Something went wrong...</Typography>
      )} */}
    </Box>
  );
};

export default EditEvent;




