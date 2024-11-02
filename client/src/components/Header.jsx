import Navbar from './Navbar';
import { Box } from '@mui/material';
import '../index.css';

const Header =() => {
  return (

    <Box className='header'>
    <img
      className='logo'
      src='/images/linkup.png'
      alt='LinkUp logo'
      onClick={() => (window.location.href = '/')}
      style={{ height: '75px', cursor: 'pointer' }}
      >
        </img>
      {/* Navbar component */}
      <Navbar />
    </Box>
  );
};

export default Header;
