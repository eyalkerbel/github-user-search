import React, {useCallback, useEffect} from 'react';
import {Button, debounce, Grid, TextField} from "@mui/material";

interface Props {
  onSearch: (username: string) => void;
}

export const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const debouncedSearch = useCallback(
    debounce((nextValue) => onSearch(nextValue), 500),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, debouncedSearch]);



  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" >
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Search GitHub Users"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={() => onSearch(searchTerm)}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};
