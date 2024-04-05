import React from 'react';
import PaginatedList from './PaginatedList';
import {useNavigate} from "react-router-dom";
import Item from "./Item";
import {Following} from "../../types";
import {Box, CircularProgress} from "@mui/material";
import {ITEM_PER_PAGE_PAGINATION} from "../../const";

interface FollowingListProps {
  following: Following[]
  loading: boolean
}


const FollowingList: React.FC<FollowingListProps> = ({ following,loading }) => {
  const navigate = useNavigate()

  const onSelectedUser = (name: string): void => {
    navigate(`/user/${name}`);
  }

  const renderItem = (following: Following): JSX.Element => (
    <Item key={following.login} displayName={following.login} logoUrl={following.avatar_url} onSelectUser={onSelectedUser} />
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
      items={following}
    />
  );
};

export default FollowingList;
