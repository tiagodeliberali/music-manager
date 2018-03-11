import React, { PropTypes } from 'react';
import SearchBar from './SearchBar';
import MusicEditor from '../MusicEditor'

import { withStyles } from 'material-ui/styles';
import { AppBar, IconButton, Toolbar } from 'material-ui';
import { LibraryMusic } from 'material-ui-icons';

const styles = theme => ({
  button: {
    marginLeft: 50
  }
});

function Header(props) {
  const { classes, onSearch } = props;
  return (
    <header className="header">
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <LibraryMusic />
          </IconButton>
          <SearchBar onSearch={onSearch} />
          <MusicEditor onSave={props.onSave} />
        </Toolbar>
      </AppBar>
    </header>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);