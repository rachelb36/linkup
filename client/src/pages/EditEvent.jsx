import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TextField, Button, Box, Typography } from '@mui/material';
import { UPDATE_EVENT, DELETE_EVENT } from '../utils/mutations';  // Import the delete mutation
import { GET_ALL_EVENTS } from '../utils/queries';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const handleTimeChange = (newTime) => {
  setEventData({ ...eventData, time: dayjs(newTime).format("HH:mm") });
};

const EditEvent = ({ eventId }) => {
  const { loading, data } = useQuery(GET_ALL_EVENTS, {
    variables: { id: eventId },
  });

  const [updateEvent, { error: updateError }] = useMutation(UPDATE_EVENT);
  const [deleteEvent, { error: deleteError }] = useMutation(DELETE_EVENT, {
    onCompleted: () => {
      toast.success('Event deleted successfully!');
      // Redirect or refresh the page if needed
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
    date: '',
    time: '',
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
          date: eventToEdit.date ? eventToEdit.date.slice(0, 10) : '',
          time: eventToEdit.time || '',
          image: eventToEdit.image || '',
        });
      }
    }
  }, [data, eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { __typename, id, ...filteredEventData } = eventData;

      await updateEvent({
        variables: {
          updateEventId: eventId,
          input: filteredEventData,
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
          variables: { deleteEventId: eventId },
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
      <TextField
        name="date"
        label="Event Date"
        type="date"
        value={eventData.date}
        onChange={handleChange}
        required
      />
      <TextField
        name="time"
        label="Event Time"
        type="time"
        value={eventData.time}
        onChange={handleChange}
        required
      />
      <TextField
        name="image"
        label="Event Photo URL"
        value={eventData.image}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Update Event
      </Button>
      <Button
        onClick={handleDelete}
        variant="contained"
        sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
      >
        Delete Event
      </Button>
      {(updateError || deleteError) && (
        <Typography color="error">
          Something went wrong...
        </Typography>
      )}
    </Box>
  );
};

export default EditEvent;



// import { useState, useEffect } from 'react';
// import { useMutation, useQuery } from '@apollo/client';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import { UPDATE_EVENT } from '../utils/mutations';
// import { GET_ALL_EVENTS } from '../utils/queries';

// const EditEvent = ({ eventId }) => {
//   const { loading, data } = useQuery(GET_ALL_EVENTS, {
//     variables: { id: eventId },
//   });

//   const [updateEvent, { error }] = useMutation(UPDATE_EVENT);
//   const [eventData, setEventData] = useState({
//     name: '',
//     description: '',
//     city: '',
//     state: '',
//     date: '',
//     time: '',
//     image: '',
//   });

//   useEffect(() => {
//     if (data && data.events) {
//       const eventToEdit = data.events.find(event => event.id === eventId);
//       if (eventToEdit) {
//         setEventData({
//           name: eventToEdit.name,
//           description: eventToEdit.description,
//           city: eventToEdit.city || '',
//           state: eventToEdit.state || '',
//           date: eventToEdit.date ? eventToEdit.date.slice(0, 10) : '',
//           time: eventToEdit.time || '',
//           image: eventToEdit.image || '',
//         });
//       }
//     }
//   }, [data, eventId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventData({ ...eventData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { __typename, id, ...filteredEventData } = eventData;

//       await updateEvent({
//         variables: {
//           updateEventId: eventId,
//           input: filteredEventData,
//         },
//       });
//       alert('Event updated successfully!');
//     } catch (err) {
//       console.error('Update failed:', err);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 3,
//         maxWidth: '600px',
//         margin: 'auto',
//         mt: 5,
//       }}
//     >
//       <Typography variant="h4" component="h1" textAlign="center">
//         Edit Event
//       </Typography>
//       <TextField
//         name="name"
//         label="Event Name"
//         value={eventData.name}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         name="description"
//         label="Event Description"
//         multiline
//         rows={4}
//         value={eventData.description}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         name="city"
//         label="City"
//         value={eventData.city}
//         onChange={handleChange}
//       />
//       <TextField
//         name="state"
//         label="State"
//         value={eventData.state}
//         onChange={handleChange}
//       />
//       <TextField
//         name="date"
//         label="Event Date"
//         type="date"
//         value={eventData.date}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         name="time"
//         label="Event Time"
//         type="time"
//         value={eventData.time}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         name="image"
//         label="Event Photo URL"
//         value={eventData.image}
//         onChange={handleChange}
//       />
//       <Button type="submit" variant="contained" color="primary">
//         Update Event
//       </Button>
//       {error && <Typography color="error">Something went wrong...</Typography>}
//     </Box>
//   );
// };

// export default EditEvent;
