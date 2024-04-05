import React, {ReactElement, useState} from 'react';
import {Box, List, Pagination, Paper} from '@mui/material';

interface PaginatedListProps<Item> {
  renderItem: (item: Item) => ReactElement;
  itemsPerPage: number;
  items: any[]
}

function PaginatedList<Item>({
                               renderItem,items,itemsPerPage
                             }: PaginatedListProps<Item>): ReactElement {

  const [page, setPage] = useState<number>(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

  return (
    <Paper>
        <>
          <List>
            {items.slice((page-1)*itemsPerPage , Math.min((page-1)*itemsPerPage + itemsPerPage , items.length)).map(renderItem)}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
            <Pagination
              count={Math.ceil(items.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </>

    </Paper>
  );
}

export default PaginatedList;
