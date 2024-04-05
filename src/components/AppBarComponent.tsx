import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {Brightness4, Brightness7} from '@mui/icons-material';
import Grid from '@mui/material/Grid';

interface AppBarComponentProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({darkMode, toggleDarkMode}) => (
  <AppBar position="static">
    <Toolbar>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6">GitHub Profile Finder</Typography>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7/> : <Brightness4/>}
        </IconButton>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default AppBarComponent;
