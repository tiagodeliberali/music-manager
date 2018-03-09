import React, { PropTypes, Component } from 'react';
import SearchBar from './SearchBar';
import AddMusic from './AddMusic'

import { withStyles } from 'material-ui/styles';
import { AppBar, IconButton, Toolbar, Button } from 'material-ui';

import { LibraryMusic } from 'material-ui-icons';

const styles = theme => ({
  button: {
    marginLeft: 50
  }
});

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
          <AddMusic onSave={props.onSave} />
        </Toolbar>
      </AppBar>
    </header>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);