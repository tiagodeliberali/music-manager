import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const defaultStyle = {
  marginLeft: 20
};

class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header className="header">
      <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Músicas do Louvor
            </Typography>
          </Toolbar>
        </AppBar>
          <h1 style={defaultStyle} >todos</h1>
          <TodoTextInput newTodo
                         onSave={this.handleSave.bind(this)}
                         placeholder="What needs to be done?" />
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default Header;
