import React from 'react';
import {ListItem, ListItemAvatar, Avatar, ListItemText, Typography, ListItemButton} from '@mui/material';

interface ItemProps {
  displayName: string;
  logoUrl: string;
  onSelectUser: (username: string) => void;
}

const Item: React.FC<ItemProps> = ({ displayName, logoUrl, onSelectUser }) => (
  <ListItem >
    <ListItemAvatar>
      <Avatar>
        <img src={logoUrl} alt={displayName} loading="lazy" style={{ width: '100%', height: '100%' }} />
      </Avatar>
    </ListItemAvatar>
    <ListItemButton onClick={() => onSelectUser(displayName)}>
    <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 'medium' }}>{displayName}</Typography>} />
    </ListItemButton>
  </ListItem>
);

export default Item;
