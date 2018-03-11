import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Menu, { MenuItem } from 'material-ui/Menu';
import { Typography, IconButton, Collapse, CardHeader } from 'material-ui'
import { Favorite, Layers, LayersClear, ExpandMore, MoreVert } from 'material-ui-icons'
import classnames from 'classnames'
import MusicEditor from '../MusicEditor'

const styles = theme => ({
  card: {
    marginTop: 30,
    maxWidth: 350
  },
  cardContent: {
    paddingTop: 0
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
})

class MusicItem extends Component {
  state = {
    expanded: false,
    menuElement: null
  }

  constructor(props) {
    super(props)
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  firstLines = (content) => {
    return content.substring(0, content.indexOf('\n'))
  }

  otherLines = (content) => {
    return content.substring(content.indexOf('\n') + 1)
  }

  handleMenuClick = event => {
    this.setState({ menuElement: event.currentTarget });
  }

  handleMenuClose = () => {
    this.setState({ menuElement: null });
  }

  render = () => {
    const { classes, music, onSave } = this.props;
    const { menuElement } = this.state;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader action={
            <div>
              <IconButton
                aria-owns={menuElement ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleMenuClick}>
                <MoreVert />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={menuElement}
                open={Boolean(menuElement)}
                onClose={this.handleMenuClose}
              >
                <MenuItem>
                  <MusicEditor
                    onSave={onSave}
                    onClose={this.handleMenuClose}
                    music={music} />
                </MenuItem>
              </Menu>
            </div>
          }
            title={music.name}
            subheader={"Tocada " + (music.times || 0) + " vezes"} />
          <CardContent className={classes.cardContent}>
            <Typography variant="headline" component="h2">
            </Typography>
            <Typography component="pre">
              {this.firstLines(music.lyrics)}
            </Typography>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <Typography component="pre">
                {this.otherLines(music.lyrics)}
              </Typography>
            </Collapse>
          </CardContent>
          <CardActions>
            <IconButton>
              <Favorite />
            </IconButton>
            <IconButton>
              {music.hasTransparency 
                ? <Layers /> 
                : <LayersClear />}
            </IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Mostrar tudo"
            >
              <ExpandMore />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    )
  }
}

MusicItem.propTypes = {
  classes: PropTypes.object.isRequired,
  music: PropTypes.object.isRequired
}

export default withStyles(styles)(MusicItem)