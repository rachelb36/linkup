import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_EVENTS, GET_ALL_USERS } from '../utils/queries';
import { IS_ADMIN } from '../utils/mutations';
import AddEvent from './AddEvent';
import EditEvent from './EditEvent'; // Import the EditEvent component
import { useLocation } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
  Container,
  Modal,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Auth from '../utils/auth';

const AdminPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_EVENTS, IS_ADMIN);
  const location = useLocation();
  const firstName = location.state?.firstName;
  const {
    loading: usersLoading,
    data: usersData,
    error: usersError,
  } = useQuery(GET_ALL_USERS, IS_ADMIN, {
    context: {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    },
  });

  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for the edit modal
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleEditClick = (eventId) => {
    setSelectedEventId(eventId);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = () => {
    refetch(); // Refetch events after saving
    setIsEditModalOpen(false);
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error.message}</p>;

  const handleUsersModalOpen = () => setIsUsersModalOpen(true);
  const handleUsersModalClose = () => setIsUsersModalOpen(false);
  const handleAddEventModalOpen = () => setIsAddEventModalOpen(true);
  const handleAddEventModalClose = () => setIsAddEventModalOpen(false);
  const handleEditModalClose = () => setIsEditModalOpen(false);

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end" gap={2} mt={4} mb={4}>
        <Typography variant="h4">
          Hello {firstName}, welcome to the Admin Page!
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddEventModalOpen}>
          Add Event
        </Button>
        <Button variant="contained" color="secondary" onClick={handleUsersModalOpen}>
          View Users
        </Button>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {data.events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card sx={{ maxWidth: 345, mx: 'auto' }}>
              <CardMedia
                component="img"
                height="140"
                image={event.image || '/placeholder-image.jpg'}
                alt={event.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {event.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => handleEditClick(event.id)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Event Modal */}
      <Modal open={isAddEventModalOpen} onClose={handleAddEventModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <AddEvent onClose={handleAddEventModalClose} refetchEvents={refetch} />
          <Button onClick={handleAddEventModalClose} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>

      {/* Edit Event Modal */}
      <Modal open={isEditModalOpen} onClose={handleEditModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <EditEvent eventId={selectedEventId} onSave={handleSaveChanges} />
          <Button onClick={handleEditModalClose} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>

      {/* Users Modal */}
      <Modal open={isUsersModalOpen} onClose={handleUsersModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Registered Users
          </Typography>
          {usersLoading ? (
            <Typography>Loading users...</Typography>
          ) : usersError ? (
            <Typography color="error">Error loading users: {usersError.message}</Typography>
          ) : (
            <List>
              {usersData?.users &&
                usersData.users.map((user) => (
                  <ListItem key={user._id}>
                    <ListItemText
                      primary={`${user.firstName} ${user.lastName}`}
                      secondary={`Email: ${user.email} | Occupation: ${user.occupation}`}
                    />
                  </ListItem>
                ))}
            </List>
          )}
          <Button onClick={handleUsersModalClose} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default AdminPage;





// import React, { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_ALL_EVENTS, GET_ALL_USERS } from '../utils/queries';
// import { IS_ADMIN, UPDATE_EVENT } from '../utils/mutations';
// import AddEvent from './AddEvent';
// import { useLocation } from 'react-router-dom';

// import {
//   Card,
//   CardContent,
//   CardActions,
//   CardMedia,
//   TextField,
//   Typography,
//   Button,
//   Grid,
//   Box,
//   Container,
//   Modal,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material';
// import Auth from '../utils/auth';


// const AdminPage = () => {
//   const { loading, error, data, refetch } = useQuery(GET_ALL_EVENTS, IS_ADMIN);
//   const location = useLocation();
//   const firstName = location.state?.firstName;
//   const {
//     loading: usersLoading,
//     data: usersData,
//     error: usersError,
//   } = useQuery(GET_ALL_USERS, IS_ADMIN, {
//     context: {
//       headers: {
//         Authorization: `Bearer ${Auth.getToken()}`,
//       },
//     },
//   });



//   const [updateEvent] = useMutation(UPDATE_EVENT);
//   const [isEditing, setIsEditing] = useState(null);
//   const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
//   const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
//   const [editData, setEditData] = useState({});
//   const [message, setMessage] = useState('');

//   const handleEditClick = (event) => {
//     setIsEditing(event.id);
//     setEditData(event); // Populate edit data
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSaveChanges = async (eventId) => {
//     try {
//       await updateEvent({ variables: { updateEventId: eventId, input: editData } });
//       setMessage('Changes saved!');
//       refetch(); 
//       setIsEditing(null);
//     } catch (err) {
//       console.error(err);
//       setMessage('Error saving changes.');
//     }
//   };

//   if (loading) return <p>Loading events...</p>;
//   if (error) return <p>Error loading events: {error.message}</p>;

//   const handleUsersModalOpen = () => setIsUsersModalOpen(true);
//   const handleUsersModalClose = () => setIsUsersModalOpen(false);
//   const handleAddEventModalOpen = () => setIsAddEventModalOpen(true);
//   const handleAddEventModalClose = () => setIsAddEventModalOpen(false);

//   return (
//     <Container>
//       <Box display="flex" justifyContent="flex-end" gap={2} mt={4} mb={4}>
//       <Typography variant="h4">
//         Hello {firstName}, welcome to the Admin Page!
//       </Typography>
//       {/* Other AdminPage content */}
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleAddEventModalOpen}
//         >
//           Add Event
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleUsersModalOpen}
//         >
//           View Users
//         </Button>
//       </Box>

//       {message && <Typography color="success" align="center">{message}</Typography>}

//       <Grid container spacing={4} justifyContent="center">
//         {data.events.map((event) => (
//           <Grid item xs={12} sm={6} md={4} key={event.id}>
//             <Card sx={{ maxWidth: 345, mx: 'auto' }}>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={event.image || '/placeholder-image.jpg'}
//                 alt={event.name}
//               />
//               <CardContent>
//                 {isEditing === event.id ? (
//                   <Box component="form" noValidate autoComplete="off">
//                     <TextField
//                       fullWidth
//                       label="Event Name"
//                       name="name"
//                       value={editData.name}
//                       onChange={handleChange}
//                       margin="normal"
//                     />
//                     {/* Additional Fields for editing */}
//                   </Box>
//                 ) : (
//                   <Box>
//                     <Typography variant="h6" component="div">
//                       {event.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {event.description}
//                     </Typography>
//                   </Box>
//                 )}
//               </CardContent>
//               <CardActions>
//                 {isEditing === event.id ? (
//                   <>
//                     <Button
//                       size="small"
//                       color="primary"
//                       variant="contained"
//                       onClick={() => handleSaveChanges(event.id)}
//                     >
//                       Save
//                     </Button>
//                     <Button
//                       size="small"
//                       color="secondary"
//                       onClick={() => setIsEditing(null)}
//                     >
//                       Cancel
//                     </Button>
//                   </>
//                 ) : (
//                   <Button
//                     size="small"
//                     color="primary"
//                     variant="outlined"
//                     onClick={() => handleEditClick(event)}
//                   >
//                     Edit
//                   </Button>
//                 )}
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Add Event Modal */}
//       <Modal open={isAddEventModalOpen} onClose={handleAddEventModalClose}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 500,
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <AddEvent onClose={handleAddEventModalClose} refetchEvents={refetch} />
//           <Button onClick={handleAddEventModalClose} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//             Close
//           </Button>
//         </Box>
//       </Modal>

//       {/* Users Modal */}
//       <Modal open={isUsersModalOpen} onClose={handleUsersModalClose}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 500,
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Registered Users
//           </Typography>
//           {usersLoading ? (
//             <Typography>Loading users...</Typography>
//           ) : usersError ? (
//             <Typography color="error">Error loading users: {usersError.message}</Typography>
//           ) : (
//             <List>
//               {usersData?.users && usersData.users.map((user) => (
//                 <ListItem key={user._id}>
//                   <ListItemText
//                     primary={`${user.firstName} ${user.lastName}`}
//                     secondary={`Email: ${user.email} | Occupation: ${user.occupation}`}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           )}
//           <Button onClick={handleUsersModalClose} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//             Close
//           </Button>
//         </Box>
//       </Modal>
//     </Container>
//   );
// };

// export default AdminPage;




// import React, { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_ALL_EVENTS } from '../utils/queries';
// import { UPDATE_EVENT } from '../utils/mutations';
// import AddEventModal from './AddEvent'; 
// import {
//   Card,
//   CardContent,
//   CardActions,
//   CardMedia,
//   TextField,
//   Typography,
//   Button,
//   Grid,
//   Box,
//   Container,
// } from '@mui/material';

// const AdminPage = () => {
//   const { loading, error, data, refetch } = useQuery(GET_ALL_EVENTS);
//   const [updateEvent] = useMutation(UPDATE_EVENT);
//   const [isEditing, setIsEditing] = useState(null);
//   const [editData, setEditData] = useState({});
//   const [message, setMessage] = useState('');

//   const handleEditClick = (event) => {
//     setIsEditing(event.id);
//     setEditData(event); // Populate edit data
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSaveChanges = async (eventId) => {
//     try {
//       await updateEvent({ variables: { updateEventId: eventId, input: editData } });
//       setMessage('Changes saved!');
//       refetch(); // Refetch the events to get the latest data
//       setIsEditing(null); // Close edit mode
//     } catch (err) {
//       console.error(err);
//       setMessage('Error saving changes.');
//     }
//   };

//   if (loading) return <p>Loading events...</p>;
//   if (error) return <p>Error loading events: {error.message}</p>;

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom align="center" mt={4}>
//         Admin Events
//       </Typography>
//       <Button 
//         variant="contained" 
//         color="primary" 
//         onClick={() => setIsEditing('add')} 
//         sx={{ mb: 4, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
//       >
//         Add Event
//       </Button>
//       {message && <Typography color="success" align="center">{message}</Typography>}

//       <Grid container spacing={4} justifyContent="center">
//         {data.events.map((event) => (
//           <Grid item xs={12} sm={6} md={4} key={event.id}>
//             <Card sx={{ maxWidth: 345, mx: 'auto' }}>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={event.image || '/placeholder-image.jpg'} // Placeholder if no image
//                 alt={event.name}
//               />
//               <CardContent>
//                 {isEditing === event.id ? (
//                   <Box component="form" noValidate autoComplete="off">
//                     <TextField
//                       fullWidth
//                       label="Event Name"
//                       name="name"
//                       value={editData.name}
//                       onChange={handleChange}
//                       margin="normal"
//                     />
//                     <TextField
//                       fullWidth
//                       label="Description"
//                       name="description"
//                       value={editData.description}
//                       onChange={handleChange}
//                       margin="normal"
//                     />
//                     <TextField
//                       fullWidth
//                       label="City"
//                       name="city"
//                       value={editData.city}
//                       onChange={handleChange}
//                       margin="normal"
//                     />
//                     <TextField
//                       fullWidth
//                       label="State"
//                       name="state"
//                       value={editData.state}
//                       onChange={handleChange}
//                       margin="normal"
//                     />
//                     <TextField
//                       fullWidth
//                       label="Address"
//                       name="address"
//                       value={editData.address}
//                       onChange={handleChange}
//                       margin="normal"
//                     />
//                     <TextField
//                       fullWidth
//                       label="ZIP Code"
//                       name="zip"
//                       value={editData.zip}
//                       onChange={handleChange}
//                       margin="normal"
//                     />
//                     <TextField
//                       fullWidth
//                       label="Time"
//                       name="time"
//                       value={editData.time}
//                       onChange={handleChange}
//                       margin="normal"
//                     />
//                     <TextField
//                       fullWidth
//                       label="Date"
//                       name="date"
//                       value={editData.date}
//                       onChange={handleChange}
//                       margin="normal"
//                     />
//                     <TextField
//                       fullWidth
//                       label="Image URL"
//                       name="image"
//                       value={editData.image}
//                       onChange={handleChange}
//                       margin="normal"
//                     />
//                   </Box>
//                 ) : (
//                   <Box>
//                     <Typography variant="h6" component="div">
//                       {event.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {event.description}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Location: {event.city}, {event.state}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Date: {event.date}
//                     </Typography>
//                   </Box>
//                 )}
//               </CardContent>
//               <CardActions>
//                 {isEditing === event.id ? (
//                   <>
//                     <Button 
//                       size="small" 
//                       color="primary" 
//                       variant="contained" 
//                       onClick={() => handleSaveChanges(event.id)}
//                     >
//                       Save
//                     </Button>
//                     <Button 
//                       size="small" 
//                       color="secondary" 
//                       onClick={() => setIsEditing(null)}
//                     >
//                       Cancel
//                     </Button>
//                   </>
//                 ) : (
//                   <Button 
//                     size="small" 
//                     color="primary" 
//                     variant="outlined" 
//                     onClick={() => handleEditClick(event)}
//                   >
//                     Edit
//                   </Button>
//                 )}
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {isEditing === 'add' && <AddEventModal onClose={() => setIsEditing(null)} refetch={refetch} />}
//     </Container>
//   );
// };

// export default AdminPage;
