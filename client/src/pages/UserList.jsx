import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Box,
  Button,
  TextField,
} from '@mui/material';
import {
  Edit,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { GET_ALL_USERS } from '../utils/queries';
// import { UPDATE_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const { loading, data, refetch } = useQuery(GET_ALL_USERS);
  const users = data?.users || [];

  const [openRows, setOpenRows] = useState({});
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  // const [updateUser] = useMutation(UPDATE_USER);
  // const [deleteUser] = useMutation(DELETE_USER);
  const navigate = useNavigate();

  // const onUpdateUser = (user) => {
  //   setEditingId(user._id);
  //   setFormData({
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     address: user.address,
  //     city: user.city,
  //     state: user.state,
  //     zip: user.zip,
  //     phoneNumber: user.phoneNumber,
  //     email: user.email,
  //     occupation: user.occupation,
  //     isAdmin: user.isAdmin,
  //   });
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await updateUser({
  //       variables: { id: editingId, ...formData },
  //     });
  //     setEditingId(null); // Exit editing mode
  //     setFormData({}); // Clear form data
  //     refetch(); // Refresh list after update
  //     navigate(`/user/${editingId}`);
  //   } catch (err) {
  //     console.error('Error updating user:', err);
  //   }
  // };

  // const onDeleteUser = async (id) => {
  //   try {
  //     await deleteUser({ variables: { id } });
  //     refetch(); // Refresh the list after deletion
  //     alert('User deleted successfully!');
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //     alert('Failed to delete user.');
  //   }
  // };

  const handleRowClick = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Box width={600} margin='auto' bgcolor='white' padding={2}>
      <h2>These are all of the members</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((users) => (
              <React.Fragment key={user._id}>
                <TableRow>
                  <TableCell>
                    <IconButton onClick={() => handleRowClick(user._id)}>
                      {openRows[User._id] ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.occupation}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onUpdateUser(user)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {/* <IconButton onClick={() => onDeleteUser(user._id)}>
                      <Delete />
                    </IconButton> */}
                  </TableCell>
                </TableRow>

                {/* Expandable row for details and editing */}
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={openRows[user._id]}
                      timeout='auto'
                      unmountOnExit
                    >
                      <Box margin={1}>
                        <Table size='small' aria-label='user-details'>
                          <TableBody>
                            <TableRow>
                              <TableCell>Email:</TableCell>
                              <TableCell>{user.email}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Phone Number:</TableCell>
                              <TableCell>{user.phoneNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Address:</TableCell>
                              <TableCell>{user.address}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
