import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { Typography, IconButton, Collapse } from 'material-ui';
import { Favorite, Layers, LayersClear, ExpandMore } from 'material-ui-icons';
import classnames from 'classnames';

const styles = theme => ({
  card: {
    width: 350,
    margin: 30
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
});

class MusicItem extends Component {
  state = { expanded: false };

  constructor(props) {
    super(props)
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  firstLines = (content) => {
    return content.substring(0, content.indexOf('\n'))
  }

  otherLines = (content) => {
    return content.substring(content.indexOf('\n') + 1)
  }

  render = () => {
    const { classes, music } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline" component="h2">
              {music.name}
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
            <IconButton aria-label="Add to favorites">
              <Favorite />
            </IconButton>
            <IconButton aria-label="Share">
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
    );
  }
}

MusicItem.propTypes = {
  classes: PropTypes.object.isRequired,
  music: PropTypes.object.isRequired
};

export default withStyles(styles)(MusicItem);