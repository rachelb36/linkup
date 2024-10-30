import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Box, Typography } from '@mui/material';
import { ADD_EVENT } from '../utils/mutations';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    city: '',
    state: '',
    date: null,
    time: null,
    image: '',
  });

  const [addEvent, { error }] = useMutation(ADD_EVENT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
    toast.info(`${name.charAt(0).toUpperCase() + name.slice(1)} updated to: ${value}`);
  };

  const handleDateChange = (newValue) => {
    setEventData({ ...eventData, date: newValue });
    toast.info(`Date updated to: ${newValue ? newValue.format('YYYY-MM-DD') : ''}`);
  };

  const handleTimeChange = (newValue) => {
    setEventData({ ...eventData, time: newValue });
    toast.info(`Time updated to: ${newValue ? newValue.format('HH:mm') : ''}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEvent({
        variables: {
          input: {
            ...eventData,
            date: eventData.date ? eventData.date.toISOString() : null,
            time: eventData.time ? eventData.time.format('HH:mm') : null,
          },
        },
      });
      toast.success('Event added successfully!');
      setEventData({
        name: '',
        description: '',
        city: '',
        state: '',
        date: null,
        time: null,
        image: '',
      });
    } catch (err) {
      toast.error('Failed to add event');
      console.error(err);
    }
  };

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
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
      <Typography variant="h4" component="h1" textAlign="center">
        Add Event
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
          slots={{ textField: TextField }}
        />
        <TimePicker
          label="Event Time"
          value={eventData.time}
          onChange={handleTimeChange}
          slots={{ textField: TextField }}
        />
      </LocalizationProvider>
      <TextField
        name="image"
        label="Event Photo URL"
        value={eventData.image}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Event
      </Button>
      {error && <Typography color="error">Something went wrong...</Typography>}
    </Box>
  );
};

export default AddEvent;
