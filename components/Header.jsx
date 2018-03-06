import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';

import { withStyles } from 'material-ui/styles';
import { AppBar, IconButton, Toolbar, Button, Input } from 'material-ui';

import { LibraryMusic, Add } from 'material-ui-icons';

import theme from '../src/material_ui_raw_theme_file'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    marginLeft: 20,
  },
  input: {
    width: 600
  }
};

function Header(props) {
  const { classes } = props;
  return (
    <header className="header">
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <LibraryMusic />
          </IconButton>
          <Input
            placeholder="Buscar música"
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          <Button className={classes.button}
                  variant="fab"
                  mini 
                  aria-owns={open ? 'menu-appbar' : null}
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

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
