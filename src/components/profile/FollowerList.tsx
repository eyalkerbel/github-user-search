import React from 'react';
import PaginatedList from './PaginatedList';
import {useNavigate} from "react-router-dom";
import Item from "./Item";
import {Box, CircularProgress} from "@mui/material";
import {Follower} from "../../types";
import {ITEM_PER_PAGE_PAGINATION} from "../../const";

export interface FollowersListProps {
  followers: Follower[];
  loading: boolean
}


const FollowersList: React.FC<FollowersListProps> = ({ followers,loading }) => {
  const navigate = useNavigate()

  const onSelectedUser = (name: string): void => {
    navigate(`/user/${name}`);
  }


  const renderItem = (follower: Follower): JSX.Element => (
    <Item key={follower.login} displayName={follower.login} logoUrl={follower.avatar_url} onSelectUser={onSelectedUser} />
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
      items={followers}
    />
  );
};

export default FollowersList;
