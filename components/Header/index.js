import React, { PropTypes, Component } from 'react';
import SearchBar from './SearchBar';

import { withStyles } from 'material-ui/styles';
import { AppBar, IconButton, Toolbar, Button } from 'material-ui';

import { LibraryMusic, Add } from 'material-ui-icons';

function Header(props) {
  const { classes } = props;
  return (
    <header className="header">
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <LibraryMusic />
          </IconButton>
          <SearchBar />
          <Button variant="fab"
                  mini 
                  aria-haspopup="true"
                  color="inherit"
                >
            <Add />
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
