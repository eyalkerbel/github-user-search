import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchUserProfile} from '../services/GitHubService';
import {IUserProfile} from '../types';
import {Box, CircularProgress, Container} from '@mui/material';
import {UserProfile} from "../components/profile/UserProfile";

const UserPage: React.FC = () => {
  const { username } = useParams<string>();
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);

  useEffect(() => {
    if (username) {
       fetchUserProfile(username)
        .then(setUserProfile)
        .catch(console.error);
    }
  }, [username]);

  return (
    <Container maxWidth="md">
      <Box my={4} display="flex" justifyContent="center">
        {userProfile ? <UserProfile user={userProfile} /> : <CircularProgress />}
      </Box>
    </Container>
  );
};

export default UserPage;
