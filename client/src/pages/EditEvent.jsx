import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TextField, Button, Box, Typography } from '@mui/material';
import { UPDATE_EVENT } from '../utils/mutations'; 
import { GET_ALL_EVENTS } from '../utils/queries';

const EditEvent = ({ eventId }) => {
  const { loading, data } = useQuery(GET_ALL_EVENTS, {
    variables: { id: eventId },
  });

  const [updateEvent, { error }] = useMutation(UPDATE_EVENT);

  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    city: '',  
    state: '',  
    image: '',
  });

  useEffect(() => {
    if (data) {
      setEventData(data.event);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent({
        variables: {
          id: eventId,
          input: eventData,
        },
      });
      alert('Event updated successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Box
      component='form'
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
      <Typography variant='h4' component='h1' textAlign='center'>
        Edit Event
      </Typography>
      <TextField
        name='name'
        label='Event Name'
        value={eventData.name}
        onChange={handleChange}
        required
      />
        <TextField
        name='description'
        label='Event Description'
        multiline
        rows={4}
        value={eventData.description}
        onChange={handleChange}
        required
      />
      <TextField
        name='date'
        label='Event Date'
        type='date'
        value={eventData.date}
        onChange={handleChange}
        required
      />

          <TextField
        name='time'
        label='Event Time'
        type='time'
        value={eventData.time}
        onChange={handleChange}
        required
      />
      <TextField
        name='image'
        label='Upload Image'
        value={eventData.image}
        onChange={handleChange}
      />
      <Button type='submit' variant='contained' color='primary'>
        Update Event
      </Button>
      {error && <Typography color='error'>Something went wrong...</Typography>}
    </Box>
  );
};

export default EditEvent;