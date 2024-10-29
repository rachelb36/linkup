import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Grid2,
  Typography,
  Button,
} from '@mui/material';
import { GET_ALL_EVENTS } from '../utils/queries';
import { ADD_USER_TO_EVENT } from '../utils/mutations';
import { GET_ALL_USERS } from '../utils/queries';
import './events.css';

const ViewEvents = () => {
  const { loading, data } = useQuery(GET_ALL_EVENTS);
  const [addUserToEvent] = useMutation(ADD_USER_TO_EVENT);

  async function addUserToEventHandler(eventId) {
    try {
      await addUserToEvent({
        variables: { eventId },
      });
      console.log('User added to event');
    } catch (err) {
      console.error('Error adding user to event:', err);
    }
  }

  if (loading) return <p>Loading events...</p>;

  const events = data?.events || [];

  return (
    <Container>
      <Grid2 className='event_grid'>
        {events.map((event) => (
          <Card className='event_card' key={event.id}>
            <CardMedia
              className='event_image'
              image={event.image}
              alt={event.name}
            />
            <CardContent className='card_text'>
              <Typography>{event.name}</Typography>
              <Typography component='p'>{event.date}</Typography>
              <Typography color='text.secondary'>
                {event.description}
              </Typography>
              <Button
                variant='contained'
                color='primary'
                sx={{ mt: 1 }}
                onClick={() => addUserToEventHandler(event.id)}
              >
                Sign me up
              </Button>
            </CardContent>
          </Card>
        ))}
      </Grid2>
    </Container>
  );
};

export default ViewEvents;

// import React from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { Box, Card, CardMedia, CardContent, Grid2 } from '@mui/material';
// import { GET_ALL_EVENTS } from '../utils/queries';
// import { ADD_USER_TO_EVENT } from '../utils/mutations';

// const ViewEvents = () => {
//   const { loading, data } = useQuery(GET_ALL_EVENTS);

//   const [addUserToEvent] = useMutation(ADD_USER_TO_EVENT);

//   async function addUserToEventHandler(event_id) {
//     await addUserToEvent({
//       variables: { eventId: event_id },
//     });

//     console.log('User added to event');
//   }

//   if (loading) return <p>Loading events...</p>;

//   const events = data?.events || [];

//   return (
//     export default function ResponsiveGrid() {
//       return (
//         <Box sx={{ flexGrow: 1 }}>
//           <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//             {Array.from(Array(6)).map((_, index) => (
//               <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
//                 <Item>{index + 1}</Item>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       );
//     }

//     return (
//       export default function ResponsiveGrid() {
//         return (
//           <Box sx={{ flexGrow: 1 }}>
//             {events.map((event) => (
//             <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} key={event.id}>
// <Card className='event_card'>
// <CardMedia component={img} height='140' image={event.image} alt={event.name} />

//               {Array.from(Array(6)).map((_, index) => (
//                 <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
//                   <Item>{index + 1}</Item>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         );
//       }

// export default ViewEvents;
