import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from '@mui/material';
import {User} from "../types";

interface UserListItemProps {
  user: User
  onClick: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onClick }) => {

  return (
    <ListItem
      button
      onClick={onClick}
      sx={{
        py: 3,
        borderBottom: '1px solid #eee',
        borderRight: '1px solid #eee',
        borderLeft: '1px solid #eee',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)'
        },
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ width: 56, height: 56, mr: 5 }}>
        <img src={user.avatar_url} alt={user.login} loading="lazy" style={{ width: '100%', height: '100%' }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{user.login}</Typography>}
      />
    </ListItem>
  );
};

export default UserListItem;
