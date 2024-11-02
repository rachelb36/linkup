import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Box, Typography, Tooltip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ADD_EVENT } from '../utils/mutations';
import { GET_ALL_EVENTS } from '../utils/queries';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const AddEvent = ({ onClose }) => {  // Add `onClose` prop for the close button if needed
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    city: '',
    state: '',
    date: dayjs(),  // Default to the current date as a Dayjs object
    time: dayjs(),  // Default to the current time as a Dayjs object
    image: '',
  });

  const [addEvent, { error }] = useMutation(ADD_EVENT, {
    refetchQueries: [{ query: GET_ALL_EVENTS }],
    onCompleted: () => {
      toast.success('Event added successfully!');
    },
    onError: (error) => {
      console.error('Failed to add event:', error);
      toast.error('Failed to add event.');
    }
  });

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

    const { name, description, city, state, date, time, image } = eventData;

    try {
      await addEvent({
        variables: {
          input: {
            name,
            description,
            city,
            state,
            date: date.format('YYYY-MM-DD'),
            time: time.format('HH:mm'),
            image
          },
        },
      });
      setEventData({
        name: '',
        description: '',
        city: '',
        state: '',
        date: dayjs(),  // Reset to current date as Dayjs object
        time: dayjs(),  // Reset to current time as Dayjs object
        image: ''
      });
    } catch (err) {
      console.error('Error adding event:', err);
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0px'}}>
        <Tooltip title="Close">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
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
      
      <Button type="submit" variant="contained" color="primary">
        Add Event
      </Button>
      
      {error && <Typography color="error">Something went wrong...</Typography>}
    </Box>
  );
};

export default AddEvent;



