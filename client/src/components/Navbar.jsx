import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    handleClose();
    navigate('/login');
  };

  // Get user profile from the token to determine if the user is an admin
  const userProfile = auth.loggedIn() ? auth.getProfile() : null;
  const isAdmin = userProfile?.isAdmin;

  return (
    <Box className='navbar'>
      <Link to='/events' style={{ textDecoration: 'none' }}>
        <Button
          margin='10px'
          variant='contained'
          component={Link} 
          to={auth.userRole === 'admin' ? '/admin' : '/events'}
          style={{ backgroundColor: '#3ca7c2', color: '#fff' }}
        >
          Dashboard
        </Button>
      </Link>

      {/* Admin-specific buttons */}
      {isAdmin && (
        <>
          <Link to='/addevent' style={{ textDecoration: 'none' }}>
            <Button
              margin='10px'
              variant='contained'
              style={{ backgroundColor: '#3ca7c2', color: '#fff' }}
            >
              Add Event
            </Button>
          </Link>
          <Link to='/editevent' style={{ textDecoration: 'none' }}>
            <Button
              margin='10px'
              variant='contained'
              style={{ backgroundColor: '#3ca7c2', color: '#fff' }}
            >
              Edit Event
            </Button>
          </Link>
        </>
      )}

      {!auth.loggedIn() ? (
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <Button
            margin='10px'
            variant='contained'
            style={{ backgroundColor: '#f57369', color: '#fff' }}
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




// import { Box, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import auth from '../utils/auth';

// const Navbar = ({ isLoggedIn, onLogout }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear the user's session (e.g., remove token)
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     onLogout();
//     navigate('/');
//   };

//   return (
//     <Box className='navbar'>
//       {/* Use Link to wrap the Button component for navigation */}
//       <Link to='/events' style={{ textDecoration: 'none' }}>
//         <Button
//           margin='10px'
//           variant='contained'
//           style={{ backgroundColor: '#3ca7c2', color: '#fff' }}
//         >
//           Dashboard
//         </Button>
//       </Link>

//       {!auth.loggedIn() ? (
//         <Link to='/login' style={{ textDecoration: 'none' }}>
//           <Button
//             margin='10px'
//             variant='contained'
//             style={{ backgroundColor: '#f57369', color: '#fff' }}
//           >
//             Log In
//           </Button>
//         </Link>
//       ) : (
//         <Button
//           margin='10px'
//           variant='contained'
//           style={{ backgroundColor: '#3ca7c2', color: '#fff' }}
//           onClick={handleLogout}
//         >
//           Log Out
//         </Button>
//       )}
//     </Box>
//   );
// };

// export default Navbar;
