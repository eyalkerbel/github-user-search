import React, {useEffect, useState} from 'react';
import {Follower, Following, IUserProfile, Repo} from '../../types';
import {Avatar, Box, Button, Container, Link, Paper, Tab, Tabs, Typography} from '@mui/material';
import FollowerList from "./FollowerList";
import FollowingList from "./FollowingList";
import ReposList from "./ReposList";
import {fetchUserFollowers, fetchUserFollowing, fetchUserRepos} from "../../services/GitHubService";
import TabPanel from "./TabPanel";


interface Props {
  user: IUserProfile | null;
}

export const UserProfile: React.FC<Props> = ({ user }) => {
  const [value, setValue] = useState<number>(0);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [following, setFollowing] = useState<Following[]>([]);
  const [loading, setLoading] = useState({ repos: false, followers: false, following: false });

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  const fetchData = async (): Promise<void> => {
    if (!user) return;
    setLoading({ repos: true, followers: true, following: true });
    try {
      const [reposData, followersData , followingData] = await Promise.all([fetchUserRepos(user.login),fetchUserFollowers(user.login),fetchUserFollowing(user.login)])
      setRepos(reposData);
      setFollowers(followersData);
      setFollowing(followingData);
    } catch (err) {
    } finally {
      setLoading({ repos: false, followers: false, following: false });
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (!user) return null;

  return (
    <Container maxWidth="md">
      <Box textAlign="center" my={4}>
        <Avatar
          sx={{ width: 120, height: 120, margin: 'auto' }}
        ><img alt={`${user.name || user.login}'s avatar`}
              src={user.avatar_url} loading='lazy' style={{ width: '100%', height: '100%' }} /> </Avatar>
        <Typography variant="h5" sx={{ mt: 2 }}>{user.name || user.login}</Typography>
        {user.bio && <Typography sx={{ mt: 1 }}>{user.bio}</Typography>}
        {user.email && (
          <Link href={`mailto:${user.email}`} underline="hover" sx={{ mt: 1, display: 'block' }}>
            {user.email}
          </Link>
        )}
        <Box sx={{ width: '100%', mt: 3 }}>
          <Paper square>
            <Tabs value={value} onChange={handleChange} variant="fullWidth" indicatorColor="secondary" textColor="secondary">
              <Tab label="Repositories" />
              <Tab label="Followers" />
              <Tab label="Following" />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <ReposList repos={repos} loading={loading.repos} avatarUrl={user.avatar_url}  />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FollowerList followers={followers} loading={loading.followers} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <FollowingList following={following} loading={loading.following}/>
          </TabPanel>
        </Box>
        <Button variant="contained" sx={{ mt: 2 }} href={user.html_url} target="_blank">
          View GitHub Profile
        </Button>

      </Box>
    </Container>
  );
};
