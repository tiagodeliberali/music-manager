import React, { PropTypes, Component } from 'react';
import SearchBar from './SearchBar';

import { withStyles } from 'material-ui/styles';
import { AppBar, IconButton, Toolbar, Button, Tooltip } from 'material-ui';

import { LibraryMusic, Add } from 'material-ui-icons';

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
          <Tooltip id="tooltip-icon" title="Adicionar música">
            <Button className={classes.button}
                    variant="fab"
                    mini 
                    aria-haspopup="true"
                    color="inherit"
                  >
              <Add />
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </header>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);