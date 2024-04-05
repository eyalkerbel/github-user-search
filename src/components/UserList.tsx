import React, {useEffect, useRef} from 'react';
import {Box, CircularProgress, List} from '@mui/material';
import UserListItem from "./UserListItem";
import {User} from "../types";


interface UserListProps {
  users: User[];
  onSelectUser: (username: string) => void;
  fetchMoreUsers: () => void;
  loading: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser, fetchMoreUsers, loading }) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastUserElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        fetchMoreUsers();
      }
    };

    observer.current = new IntersectionObserver(callback);
    if (lastUserElementRef.current) {
      observer.current.observe(lastUserElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, fetchMoreUsers]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', px: 2 }}>
      <List sx={{ width: '100%', maxWidth: '600px' }}>
        {users.map((user, index) => (
          <Box key={user.id} ref={index === users.length - 1 ? lastUserElementRef : null} sx={{ width: '100%' }}>
            <UserListItem user={user} onClick={() => onSelectUser(user.login)} />
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </List>
    </Box>
  );
};

export default UserList;
