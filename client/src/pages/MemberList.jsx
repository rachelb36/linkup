import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const MemberList = ({ usersLoading, usersError, usersData, onClose }) => {
  return (
    <Box>
      
      <Typography id="users-modal-title" variant="h6" gutterBottom>
        Registered Members
      </Typography>

      {usersLoading ? (
        <Typography>Loading users...</Typography>
      ) : usersError ? (
        <Typography color="error">Error loading users: {usersError.message}</Typography>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {usersData?.users?.length > 0 ? (
            usersData.users.map((user) => (
              <React.Fragment key={user._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.photo} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}, ${user.occupation}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {user.city}, {user.state} <br />
                        </Typography>
                        <Typography component="span" variant="body2" color="text.primary">
                          Email: <a href={`mailto:${user.email}`}>{user.email}</a>
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))
          ) : (
            <Typography>No users found.</Typography>
          )}
        </List>
      )}
    </Box>
  );
};

export default MemberList;
