import React, { Component } from 'react'
import * as PropTypes from "prop-types"
import { withStyles } from 'material-ui/styles'
import { AppBar, Toolbar, Avatar, IconButton, Drawer, Divider } from 'material-ui'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { Menu, Add, Whatshot } from 'material-ui-icons'
import SearchBar from './SearchBar';
import MusicEditor from '../MusicEditor'

const styles = () => ({
  button: {
    marginLeft: 5,
    marginRigth: 5
  }
});

class Header extends Component {
  constructor(props) {
    super(props)

    this.onSearch = props.onSearch
    this.state = { drawer: false }
  }

  setDrawerState = (isOpen) => {
    this.setState({ drawer: isOpen })
  }

  toggleDrawerState = () => {
    this.setState({ drawer: !this.state.drawer })
  }

  render() {
    const {
      classes, onSearch, onSave, user, event
    } = this.props

    let editMusic;
    if (user && user.canEdit())
      editMusic = (
        <div>
          <ListItem button>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <MusicEditor onClose={() => this.toggleDrawerState()} onSave={onSave} />
          </ListItem>
          <Divider />
        </div>
      )

    const eventMusics = []
    const musicList = event.musics
    musicList.sort((a, b) => b.votes.length - a.votes.length)
    if (event)
      musicList.forEach((music) => {
        if (music.votes && music.votes.length > 0)
          eventMusics.push(<ListItem key={music.id} >
            <ListItemIcon>
              <Whatshot />
            </ListItemIcon>
            <ListItemText primary={music.name} secondary={`Votada ${music.votes.length} vezes`} />
          </ListItem>)
      })


    return (
      <div>
        <header className="header">
          <AppBar position="static" color="default">
            <Toolbar>
              <IconButton aria-label="Menu" onClick={() => this.toggleDrawerState()}>
                <Menu />
              </IconButton>
              <SearchBar onSearch={onSearch} />
            </Toolbar>
          </AppBar>
        </header>
        <Drawer open={this.state.drawer} onClose={() => this.setDrawerState(false)}>
          <div
            role="button">
            <List>
              <ListItem button>
                <ListItemIcon>
                  <Avatar className={classes.button} alt={user.displayName} src={user.photoURL} />
                </ListItemIcon>
                <ListItemText primary={user.displayName} />
              </ListItem>
              <Divider />
              {editMusic}
              {eventMusics}
            </List>
          </div>
        </Drawer>
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)
