import React, {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {searchUsers} from "../services/GitHubService";
import UserList from "../components/UserList";
import {Grid} from "@mui/material";
import {IUserSearchResultItem} from "../types";
import {SearchBar} from "../components/SearchBar";

const HomePage = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<IUserSearchResultItem[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleSelectUser = useCallback((username: string) => {
    navigate(`/user/${username}`);
  }, [navigate]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query) return;
    setQuery(query);
    setPage(1);
    setLoading(true);
    setError(''); // Reset error message on new search
    try {
      const users = await searchUsers(query, 1);
      setSearchResults(users);
      setHasMore(users.length > 0);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMoreUsers = useCallback(async () => {
    if (!query || loading || !hasMore) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const newUsers = await searchUsers(query, nextPage);
      setSearchResults(prevUsers => [...prevUsers, ...newUsers]);
      setPage(nextPage);
      setHasMore(newUsers.length > 0);
    } catch (error: any) {
      console.error(error);
      setError(error.message);

    } finally {
      setLoading(false);
    }
  }, [query, page, loading, hasMore]);

  return (
    <div style={{ marginTop: '1rem' }}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={8} lg={6}>
          <SearchBar onSearch={handleSearch} />
        </Grid>
        <Grid item xs={12}>
          {error === "" ? <UserList users={searchResults} onSelectUser={handleSelectUser} fetchMoreUsers={fetchMoreUsers} loading={loading} />: error }
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
