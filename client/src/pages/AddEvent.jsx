import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Box, Typography } from '@mui/material';
import { ADD_EVENT } from '../utils/mutations';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    date: null,
    time: '',
    image: '',
  });

  const [addEvent, { error }] = useMutation(ADD_EVENT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEvent({
        variables: {
          input: {
            ...eventData,
            date: eventData.date ? eventData.date.toISOString() : null,
          },
        },
      });
      alert('Event added successfully!');
      setEventData({
        name: '',
        description: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        date: null,
        time: '',
        image: '',
      });
    } catch (err) {
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
        name="address"
        label="Event Address"
        value={eventData.address}
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
      <TextField
        name="zip"
        label="Zip"
        value={eventData.zip}
        onChange={handleChange}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Event Date"
          value={eventData.date}
          onChange={(newValue) => setEventData({ ...eventData, date: newValue })}
          slots={{ textField: TextField }} // Replaces renderInput
        />
      </LocalizationProvider>
      <TextField
        name="time"
        label="Event Time"
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
        Add Event
      </Button>
      {error && <Typography color="error">Something went wrong...</Typography>}
    </Box>
  );
};

export default AddEvent;



// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import { ADD_EVENT } from '../utils/mutations';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// const AddEvent = ({ onClose, refetchEvents }) => {
//   const [eventData, setEventData] = useState({
//     name: '',
//     description: '',
//     address: '',
//     city: '',
//     state: '',
//     zip: '',
//     date: null,
//     time: '',
//     image: '',
//   });

//   const [addEvent, { error }] = useMutation(ADD_EVENT);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventData({ ...eventData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addEvent({
//         variables: {
//           input: {
//             ...eventData,
//             date: eventData.date ? eventData.date.toISOString() : null,
//           },
//         },
//       });
//       alert('Event added successfully!');
//       refetchEvents(); // Refresh events on AdminPage
//       onClose(); // Close modal after adding event
//       setEventData({
//         name: '',
//         description: '',
//         address: '',
//         city: '',
//         state: '',
//         zip: '',
//         date: null,
//         time: '',
//         image: '',
//       });
//     } catch (err) {
//       console.error('Error adding event:', err);
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
//         name="address"
//         label="Event Address"
//         value={eventData.address}
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
//       <TextField
//         name="zip"
//         label="Zip"
//         value={eventData.zip}
//         onChange={handleChange}
//       />
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DatePicker
//           label="Event Date"
//           value={eventData.date}
//           onChange={(newValue) =>
//             setEventData({ ...eventData, date: newValue })
//           }
//           renderInput={(params) => (
//             <TextField {...params} fullWidth margin="normal" />
//           )}
//         />
//       </LocalizationProvider>
//       <TextField
//         name="time"
//         label="Event Time"
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
//         Add Event
//       </Button>
//       {error && <Typography color="error">Something went wrong...</Typography>}
//     </Box>
//   );
// };

// export default AddEvent;

 