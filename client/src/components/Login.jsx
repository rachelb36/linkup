import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import '../index.css';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { ...formState } });

      if (data?.login?.token) {
        const { token, user } = data.login;
        Auth.login(token);
        setIsLoggedIn(true);

        // Redirect based on user role and pass `firstName`
        if (user.isAdmin) {
          navigate('/admin', { state: { firstName: user.firstName } });
        } else {
          navigate('/events', { state: { firstName: user.firstName } });
        }
      }
    } catch (e) {
      console.error("Login error:", e);
    }

    // Reset form fields
    setFormState({ email: '', password: '' });
  };

  return (
    <Box className="login-box" title="Login">
      <form onSubmit={handleFormSubmit}>
        <TextField
          className="form-input"
          label="Email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          className="form-input"
          label="Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>

      {isLoggedIn && (
        <Typography align="center" mt={2} color="success.main">
          Sign in successful
        </Typography>
      )}

      {error && (
        <Typography color="error" align="center" mt={2}>
          {error.message}
        </Typography>
      )}

      <Typography align="center" mt={2}>
        <Link to="/signup">Not a member? Register here.</Link>
      </Typography>
    </Box>
  );
};

export default Login;




// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import { useMutation } from '@apollo/client';
// import { LOGIN } from '../utils/mutations';
// import Auth from '../utils/auth';
// import '../index.css';

// const Login = () => {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const [login, { error }] = useMutation(LOGIN);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormState({ ...formState, [name]: value });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const { data } = await login({ variables: { ...formState } });

//       if (data?.login?.token) {
//         Auth.login(data.login.token); // Store token in Auth
//         setIsLoggedIn(true); // Set login status to true
//         navigate('/events'); // Redirect to /events page
//       }
//     } catch (e) {
//       console.error("Login error:", e);
//     }

//     // Reset form fields
//     setFormState({ email: '', password: '' });
//   };

//   return (
//     <Box className="login-box" title="Login">
//       <form onSubmit={handleFormSubmit}>
//         <TextField
//           className="form-input"
//           label="Email"
//           name="email"
//           type="email"
//           value={formState.email}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           className="form-input"
//           label="Password"
//           name="password"
//           type="password"
//           value={formState.password}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           required
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           type="submit"
//           sx={{ mt: 2 }}
//         >
//           Submit
//         </Button>
//       </form>

//       {isLoggedIn && <Typography align="center" mt={2} color="success.main">Sign in successful</Typography>}

//       {error && (
//         <Typography color="error" align="center" mt={2}>
//           {error.message}
//         </Typography>
//       )}

//       <Typography align="center" mt={2}>
//         <Link to="/signup">Not a member? Register here.</Link>
//       </Typography>
//     </Box>
//   );
// };

// export default Login;


