import React from 'react';
import {Box, CircularProgress} from '@mui/material';
import PaginatedList from './PaginatedList';
import Item from "./Item";
import {Repo} from "../../types";
import {ITEM_PER_PAGE_PAGINATION} from "../../const";


interface ReposListProps {
  avatarUrl:string
  repos: Repo[]
  loading: boolean
}

const ReposList: React.FC<ReposListProps> = ({ avatarUrl,repos,loading }) => {
  const renderItem = (repo: Repo) => (
    <Item key={repo.name} displayName={repo.name} logoUrl={avatarUrl} onSelectUser={() => window.location.href = repo.html_url} />
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PaginatedList
      renderItem={renderItem}
      itemsPerPage={ITEM_PER_PAGE_PAGINATION}
      items={repos}
    />
  );
};

export default ReposList;
