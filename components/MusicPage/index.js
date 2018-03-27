import React from 'react'
import * as PropTypes from "prop-types"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from '../../src/material_ui_raw_theme_file'
import Header from '../Header'
import MusicList from '../MusicList'

const MusicPage = ({
  musics,
  filteredMusics,
  user, activeEvent,
  onSearch, onAddMusic,
  onUpdateMusic,
  onVote,
  onExecuted
}) => {
  if (!user)
    return <div>Carregando...</div>

  if (user.isLoading)
    return <div>Carregando usuário...</div>

  if (!user.canRead())
    return <div>Você não tem acesso a esse sistema</div>

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <div>
          <Header
            onSave={onAddMusic}
            onSearch={onSearch(musics.list)}
            user={user}
            event={activeEvent} />
          <MusicList
            musics={filteredMusics}
            onSave={onUpdateMusic}
            onVote={onVote}
            onExecuted={onExecuted}
            user={user}
            event={activeEvent} />
        </div>
      </MuiThemeProvider>
    </div>
  )
}

MusicPage.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onAddMusic: PropTypes.func.isRequired,
  onUpdateMusic: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  onExecuted: PropTypes.func.isRequired,
  musics: PropTypes.object.isRequired,
  filteredMusics: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  activeEvent: PropTypes.object.isRequired
}

export default MusicPage
