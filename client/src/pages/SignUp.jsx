import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../utils/mutations';
import Auth from '../utils/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';

const SignUp = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    phoneNumber: '',
    occupation: '',
    email: '',
    password: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [signup, { error, data }] = useMutation(SIGNUP);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    toast.info(`${name.charAt(0).toUpperCase() + name.slice(1)} updated to: ${value}`);
  };

  // Form submission handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setPasswordError(''); // Clear any password error

    try {
      const { data } = await signup({
        variables: {
          userInput: { ...formState },
        },
      });

      if (data?.signup?.token) {
        Auth.login(data.signup.token);
        toast.success('Signup successful!');
      } else {
        console.error('Token missing in mutation response');
      }
    } catch (e) {
      console.error('Error during form submission:', e);
      toast.error('Error during form submission.');
    }
  };

  return (
    <Box className='login-box'>
      <ToastContainer position='top-center' autoClose={2000} hideProgressBar />
      <Typography variant='h5' align='center' mb={2}>
        Sign Up
      </Typography>
      {data ? (
        <Typography>
          Success! You may now head <Link to='/'>back to the homepage.</Link>
        </Typography>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <TextField
            label='First Name'
            name='firstName'
            type='text'
            value={formState.firstName}
            onChange={handleChange}
            fullWidth
            margin='normal'
            required
          />
          <TextField
            label='Last Name'
            name='lastName'
            type='text'
            value={formState.lastName}
            onChange={handleChange}
            fullWidth
            margin='normal'
            required
          />
          <TextField
            label='City'
            name='city'
            type='text'
            value={formState.city}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='State'
            name='state'
            type='text'
            value={formState.state}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Phone Number'
            name='phoneNumber'
            type='text'
            value={formState.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin='normal'
            required
          />
          <TextField
            label='Occupation'
            name='occupation'
            type='text'
            value={formState.occupation}
            onChange={handleChange}
            fullWidth
            margin='normal'
            required
          />
          <TextField
            label='Email'
            name='email'
            type='email'
            value={formState.email}
            onChange={handleChange}
            fullWidth
            margin='normal'
            required
          />
          <TextField
            label='Password'
            name='password'
            type='password'
            value={formState.password}
            onChange={handleChange}
            fullWidth
            margin='normal'
            required
          />
          {passwordError && (
            <Typography color='error' mt={1}>
              {passwordError}
            </Typography>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      )}
      {/* Display error toast if mutation error exists */}
      {error && toast.error(error.message)}
    </Box>
  );
};

export default SignUp;
