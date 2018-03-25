import React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, Avatar } from 'material-ui';
import SearchBar from './SearchBar';
import MusicEditor from '../MusicEditor'

const styles = () => ({
  button: {
    marginLeft: 5,
    marginRigth: 5
  }
});

function Header({
  classes, onSearch, onSave, user
}) {
  let editMusic;
  if (user && user.canEdit())
    editMusic = <MusicEditor onSave={onSave} />

  return (
    <header className="header">
      <AppBar position="static" color="default">
        <Toolbar>
          <SearchBar onSearch={onSearch} />
          {editMusic}
          <Avatar className={classes.button} alt={user.displayName} src={user.photoURL} />
        </Toolbar>
      </AppBar>
    </header>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)
