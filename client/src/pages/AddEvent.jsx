import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Box, Typography } from '@mui/material';
import { ADD_EVENT } from '../utils/mutations';
import { GET_ALL_EVENTS } from '../utils/queries';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

  const [addEvent, { error }] = useMutation(ADD_EVENT, {
    refetchQueries: [{ query: GET_ALL_EVENTS }],
    onCompleted: () => {
      toast.success('Event added successfully!');
    },
    onError: () => {
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
          input: { name, description, city, state, date, time, image },
        },
      });
      setEventData({
        name: '',
        description: '',
        city: '',
        state: '',
        date: null,
        time: null,
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




// import { useState } from 'react';
// import { useMutation, useQuery } from '@apollo/client';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import { ADD_EVENT } from '../utils/mutations';
// import { GET_ALL_EVENTS } from '../utils/queries';
// import { DatePicker, TimePicker } from '@mui/x-date-pickers';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


// export default function AddEvent() {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [image, setImage] = useState('');

//   const [addEvent] = useMutation(ADD_EVENT), {
//     variables: { name, description, city, state, date, time, image },
//     update(cache, { data: { addEvent } }) {
//       const { events } = cache.readQuery({ query: GET_ALL_EVENTS });
//       cache.writeQuery({
//         query: GET_ALL_EVENTS,
//         data: { events: [addEvent, ...events] },
//       });
//     },
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (name === '' || description === '' || city === '' || state === '' || date === '' || time === '' ) {
//       return alert('Please fill out all required fields');
//     }

//     addEvent(name, description, city, state, date, time, image);

//     setName('');
//     setDescription('');
//     setCity('');
//     setState('');
//     setDate('');
//     setTime('');
//     setImage('');
//   };

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
//         Add Event Test
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
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DatePicker
//           label="Event Date"
//           value={eventData.date}
//           onChange={handleDateChange}
//           renderInput={(props) => <TextField {...props} />}
//         />
//         <TimePicker
//           label="Event Time"
//           value={eventData.time}
//           onChange={handleTimeChange}
//           renderInput={(props) => <TextField {...props} />}
//         />
//       </LocalizationProvider>
//       <TextField
//         name="image"
//         label="Event Photo URL"
//         value={eventData.image}
//         onChange={handleChange}
//       />
//       <Button type="submit" variant="contained" color="primary">
//         Add Event
//       </Button>
//       {error && <Typography color="error">Something went wrong...</Typography>}
//     </Box>
//   );
// };

// export default AddEvent;


// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import { ADD_EVENT } from '../utils/mutations';
// import { DatePicker, TimePicker } from '@mui/x-date-pickers';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// const AddEvent = () => {
//   const [eventData, setEventData] = useState({
//     name: '',
//     description: '',
//     city: '',
//     state: '',
//     date: null,
//     time: null,
//     image: '',
//   });

//   const [addEvent, { error }] = useMutation(ADD_EVENT);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventData({ ...eventData, [name]: value });
//   };

//   const handleDateChange = (newValue) => {
//     setEventData({ ...eventData, date: newValue });
//   };

//   const handleTimeChange = (newValue) => {
//     setEventData({ ...eventData, time: newValue });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formattedEvent = {
//         ...eventData,
//         date: eventData.date ? eventData.date.toISOString().split("T")[0] : null,
//         time: eventData.time ? eventData.time.format('HH:mm') : null,
//       };

//       await addEvent({
//         variables: { input: formattedEvent },
//       });

//       // Clear form on success
//       setEventData({
//         name: '',
//         description: '',
//         city: '',
//         state: '',
//         date: null,
//         time: null,
//         image: '',
//       });

//     } catch (err) {
//       console.error('Failed to add event:', err);
//     }
//   };

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
//         Add Event
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
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DatePicker
//           label="Event Date"
//           value={eventData.date}
//           onChange={handleDateChange}
//           renderInput={(props) => <TextField {...props} />}
//         />
//         <TimePicker
//           label="Event Time"
//           value={eventData.time}
//           onChange={handleTimeChange}
//           renderInput={(props) => <TextField {...props} />}
//         />
//       </LocalizationProvider>
//       <TextField
//         name="image"
//         label="Event Photo URL"
//         value={eventData.image}
//         onChange={handleChange}
//       />
//       <Button type="submit" variant="contained" color="primary">
//         Add Event
//       </Button>
//       {error && <Typography color="error">Something went wrong...</Typography>}
//     </Box>
//   );
// };

// export default AddEvent;



