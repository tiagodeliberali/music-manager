import React, { PropTypes } from 'react';
import SearchBar from './SearchBar';
import MusicEditor from '../MusicEditor'

import { withStyles } from 'material-ui/styles';
import { AppBar, IconButton, Toolbar, Avatar } from 'material-ui';
import { LibraryMusic } from 'material-ui-icons';

const styles = theme => ({
  button: {
    marginLeft: 50
  }
});

function Header(props) {
  const { classes, onSearch, user } = props;

  let avatar;
  if (user)
    avatar = <Avatar className={classes.button} alt={user.displayName} src={user.photoURL} />

  let editMusic;
  if (user && user.canEdit())
    editMusic = <MusicEditor onSave={props.onSave} />

  return (
    <header className="header">
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <LibraryMusic />
          </IconButton>
          <SearchBar onSearch={onSearch} />
          {editMusic}
          {avatar}
        </Toolbar>
      </AppBar>
    </header>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);