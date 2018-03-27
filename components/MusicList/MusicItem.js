import React, { Component } from 'react'
import * as PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Menu, { MenuItem } from 'material-ui/Menu';
import { Typography, IconButton, Collapse, CardHeader, Badge } from 'material-ui'
import { Favorite, Layers, LayersClear, ExpandMore, MoreVert, Whatshot, MusicNote } from 'material-ui-icons'
import classnames from 'classnames'
import MusicEditor from '../MusicEditor'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
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
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
})

class ActiveEvent {
  constructor(eventMusic) {
    if (eventMusic && eventMusic.votes)
      this.votes = eventMusic.votes
    else
      this.votes = []
  }

  countVotes = () => this.votes.length
  hasVotes = () => this.votes.length > 0
  votedBy = userId => this.votes.find(item => item === userId) !== undefined
}

class MusicItem extends Component {
  state = {
    expanded: false,
    menuElement: null
  }

  handleExpandClick = () => this.setState({ expanded: !this.state.expanded })
  firstLines = content => content.substring(0, this.cutPosition(content))
  otherLines = content => content.substring(this.cutPosition(content) + 1)
  cutPosition = content => content.indexOf('\n', content.indexOf('\n') + 1)
  handleMenuClick = event => this.setState({ menuElement: event.currentTarget })
  handleMenuClose = () => this.setState({ menuElement: null })

  isExecuted = (music, event) =>
    music.executedAt && music.executedAt.find(executed => executed === event.id)

  render = () => {
    const {
      classes, onSave, onVote, onExecuted, user,
      /* eslint-disable react/prop-types */
      event,
      /* eslint-disable react/prop-types */
      music
    } = this.props;
    const { menuElement } = this.state;

    let eventDetails = {}
    if (event)
      eventDetails =
        new ActiveEvent((event.musics || []).find(eventMusic => eventMusic.id === music.id))

    const eventEnabled = event && user && user.canVote()

    let editMusic;
    if (user && user.canEdit())
      editMusic = (<div>
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
          onClose={this.handleMenuClose}>
          <MenuItem>
            <MusicEditor
              onSave={onSave}
              onClose={this.handleMenuClose}
              music={music} />
          </MenuItem>
        </Menu>
      </div>)

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            action={editMusic}
            title={music.name}
            subheader={`Tocada ${(music.executedAt || []).length} vezes`} />
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
            {eventEnabled && <IconButton>
              {eventDetails.votedBy(user.id)
                ? <Favorite onClick={() => onVote(event, music, user)} color="secondary" />
                : <Favorite onClick={() => onVote(event, music, user)} />}
            </IconButton>}
            {music.hasTransparency
              ? <Layers />
              : <LayersClear />}
            {eventEnabled && eventDetails.hasVotes() && <Badge className={classes.margin} badgeContent={eventDetails.countVotes()} color="primary">
              <Whatshot color="secondary" />
            </Badge>}
            {user && user.isAdmin() && (<IconButton>
              {this.isExecuted(music, event)
              ? <MusicNote onClick={() => onExecuted(music, event)} color="primary" />
              : <MusicNote onClick={() => onExecuted(music, event)} />}
            </IconButton>)}
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Mostrar tudo">
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
  music: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onExecuted: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default withStyles(styles)(MusicItem)
