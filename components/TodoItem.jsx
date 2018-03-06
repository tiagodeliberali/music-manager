import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import { ListItem, IconButton, IconMenu, MenuItem, Avatar, ListItemSecondaryAction, ListItemText } from 'material-ui';
import { grey400 } from 'material-ui/colors'

import MoreVertIcon from 'material-ui-icons/MoreVert';
import CheckBoxIcon from 'material-ui-icons/CheckBox';
import CheckBoxBlankIcon from 'material-ui-icons/CheckBoxOutlineBlank';

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleEdit () {
    this.setState({ editing: true });
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;

    const rightIconMenu = (
      <IconMenu iconButtonElement={
          <IconButton>
            <MoreVertIcon color={grey400} />
          </IconButton>
        }
      >
        <MenuItem primaryText="Edit" onTouchTap={this.handleEdit.bind(this)}/>
        <MenuItem primaryText="Delete" onTouchTap={() => deleteTodo(todo.id)}/>
      </IconMenu>
    );

    let element;
    if (this.state.editing) {
      element = (
        // <TodoTextInput text={todo.text}
        //               editing={this.state.editing}
        //               onSave={(text) => this.handleSave(todo.id, text)} />
        <input />
      );
    } else {
      element = (
        <ListItem
          onClick={() => completeTodo(todo.id)}>
          <Avatar>
            {todo.completed ? <CheckBoxIcon /> : <CheckBoxBlankIcon />}
          </Avatar>
          <ListItemText primary={todo.text} />
          {/* <ListItemSecondaryAction>
          {rightIconMenu}
          </ListItemSecondaryAction> */}
        </ListItem>
      );
    }

    return (
      <div className={classnames({
          completed: todo.completed,
          editing: this.state.editing
        })}>
        {element}
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
};

export default TodoItem;
