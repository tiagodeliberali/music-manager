import React from 'react';
import * as PropTypes from "prop-types";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from '../../src/material_ui_raw_theme_file'
import Header from '../Header'
import MusicList from '../MusicList'

const MusicPage = ({
  musicList, user, activeEvent, onSearch, onAddMusic, onUpdateMusic, onVote
}) => {
  if (!this.state.user)
    return <div>Carregando...</div>

  if (this.state.user && !this.state.user.canRead())
    return <div>Você não tem acesso a esse sistema</div>

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <div>
          <Header
            onSave={onAddMusic}
            onSearch={onSearch}
            user={user} />
          <MusicList
            musics={musicList || []}
            onSave={onUpdateMusic}
            onVote={onVote}
            user={user}
            event={activeEvent} />
        </div>
      </MuiThemeProvider>
    </div>
  );
};

MusicPage.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onAddMusic: PropTypes.func.isRequired,
  onUpdateMusic: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  musicList: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  activeEvent: PropTypes.object.isRequired
}

export default MusicPage
