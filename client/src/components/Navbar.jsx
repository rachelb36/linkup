import { Box, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    auth.logout();  // Clear user session in auth utility
    localStorage.removeItem('userToken'); // Clear any user data in local storage
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <Box className="navbar">
      {!auth.loggedIn() ? (
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button
            sx={{ margin: '10px', backgroundColor: '#f57369', color: '#fff' }}
            variant="contained"
          >
            Log In
          </Button>
        </Link>
      ) : (
        <Button
          sx={{ margin: '10px', backgroundColor: '#3ca7c2', color: '#fff' }}
          variant="contained"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      )}
    </Box>
  );
};

export default Navbar;

