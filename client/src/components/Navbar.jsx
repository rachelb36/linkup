import { Box, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = auth.loggedIn();
  
  // Handle logout
  const handleLogout = () => {
    auth.logout();
    onLogout(); // Call any parent component's logout handler if needed
    navigate('/'); // Redirect to home after logout
  };

  // Handle login button click - redirect user based on role
  const handleLoginRedirect = () => {
    const user = auth.getProfile();
    if (user && user.isAdmin) {
      navigate('/admin');
    } else {
      navigate('/events');
    }
  };

  return (
    <Box className='navbar'>
      {!isLoggedIn ? (
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <Button
            margin='10px'
            variant='contained'
            style={{ backgroundColor: '#f57369', color: '#fff' }}
            onClick={handleLoginRedirect}
          >
            Log In
          </Button>
        </Link>
      ) : (
        <Button
          margin='10px'
          variant='contained'
          style={{ backgroundColor: '#3ca7c2', color: '#fff' }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      )}
    </Box>
  );
};

export default Navbar;
