import React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles'
import MusicItem from './MusicItem'

const styles = () => ({
  list: {
    padding: 30,
    paddingTop: 0
  }
});

const MusicList = ({
  classes, musics, user,
  /* eslint-disable react/prop-types */
  event,
  /* eslint-disable react/prop-types */
  onSave, onVote
}) => {
  if (!musics || musics.length === 0)
    return <div>Carregando...</div>;

  const items = musics.map(music => (
            <MusicItem
                key={music.id}
                music={music}
                onSave={onSave}
                onVote={onVote}
                user={user}
                event={event} />
  ));

  return (
        <ul className={classes.list}>
            {items}
        </ul>
  );
};

MusicList.propTypes = {
  classes: PropTypes.object.isRequired,
  musics: PropTypes.array.isRequired,
  onVote: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default withStyles(styles)(MusicList);
