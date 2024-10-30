import Navbar from './Navbar';
import { Box } from '@mui/material';
import '../index.css';

const Header = () => {
  return (
    <Box className='header'>
      {/* Direct reference to logo in the public folder */}
      <img
        className='logo'
        src='/linkup.png'
        alt='LinkUp logo'
        onClick={() => (window.location.href = '/Home')}
        style={{ height: '75px', cursor: 'pointer' }}
      />

      {/* Navbar component */}
      <Navbar />
    </Box>
  );
};

export default Header;
