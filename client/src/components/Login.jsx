import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      navigate('/events');
      // handleClose(); // Close the modal after a successful login
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Box className='login-box' title='Login'>
      <form onSubmit={handleFormSubmit}>
        <TextField
          className='form-input'
          label='Email'
          name='email'
          type='email'
          value={formState.email}
          onChange={handleChange}
          variant='outlined'
          fullWidth
          margin='normal'
          required
        />
        <TextField
          className='form-input'
          label='Password'
          name='password'
          type='password'
          value={formState.password}
          onChange={handleChange}
          variant='outlined'
          fullWidth
          margin='normal'
          required
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          type='submit'
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
      <h2>sign in successful</h2>
      {error && (
        <Typography color='error' align='center' mt={2}>
          {error.message}
        </Typography>
      )}

      <Typography align='center' mt={2}>
        <Link to='/signup'>Not a member? Register here.</Link>
      </Typography>
    </Box>
  );
};

export default Login;



// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import { useMutation } from '@apollo/client';
// import { LOGIN } from '../utils/mutations';
// import Auth from '../utils/auth';
// import { useNavigate } from 'react-router-dom';
// import '../index.css';

// const Login = () => {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const [login, { error }] = useMutation(LOGIN);
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const { data } = await login({
//         variables: { ...formState },
//       }); 

//       Auth.login(data.login.token);
//       if (data.login.user.isAdmin) : {
//         navigate('/admin-dashboard');
//       }
//       {
//       navigate('/events');
//       // handleClose(); // Close the modal after a successful login
//       }
//     } catch (e) {
//       console.error(e);
//     }

//     // clear form values
//     setFormState({
//       email: '',
//       password: '',
//     });
//   };

//   return (
//     <Box className='login-box' title='Login'>
//       <form onSubmit={handleFormSubmit}>
//         <TextField
//           className='form-input'
//           label='Email'
//           name='email'
//           type='email'
//           value={formState.email}
//           onChange={handleChange}
//           variant='outlined'
//           fullWidth
//           margin='normal'
//           required
//         />
//         <TextField
//           className='form-input'
//           label='Password'
//           name='password'
//           type='password'
//           value={formState.password}
//           onChange={handleChange}
//           variant='outlined'
//           fullWidth
//           margin='normal'
//           required
//         />
//         <Button
//           variant='contained'
//           color='primary'
//           fullWidth
//           type='submit'
//           sx={{ mt: 2 }}
//         >
//           Submit
//         </Button>
//       </form>
//       {error && (
//         <Typography color='error' align='center' mt={2}>
//           {error.message}
//         </Typography>
//       )}

//       <Typography align='center' mt={2}>
//         <Link to='/signup'>Not a member? Register here.</Link>
//       </Typography>
//     </Box>
//   );
// };

// export default Login;

