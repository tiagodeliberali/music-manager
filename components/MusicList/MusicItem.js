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
    width: 280,
    marginTop: 30
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
    anchorEl: null
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

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }


  render = () => {
    const { classes, music, onSave } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader action={
            <div>
              <IconButton
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}>
                <MoreVert />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem><MusicEditor onSave={onSave} onClose={this.handleClose} music={music} /></MenuItem>
              </Menu>
            </div>
          }
            title={music.name}
            subheader="Tocada 12 vezes" />
          <CardContent>
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
              {music.hasTransparency ? <Layers /> : <LayersClear />}
            </IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
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