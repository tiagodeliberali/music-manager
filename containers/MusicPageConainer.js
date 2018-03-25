import { connect } from 'react-redux'
import * as actions from '../actions/musics'
import MusicPage from '../components/MusicPage'

const mapStateToProps = state => ({
  musics: state.musics,
  filteredMusics: state.filteredMusics,
  user: state.user,
  activeEvent: state.activeEvent
})

const mapDispatchToProps = (dispatch) => {
  // TODO: Move it to a proper place
  dispatch(actions.login())
  dispatch(actions.loadMusics())
  dispatch(actions.getActiveEvent(dispatch))

  return {
    onSearch: musics => term => dispatch(actions.filterMusic(musics)(term)),
    onAddMusic: music => dispatch(actions.addMusic(music)),
    onUpdateMusic: music => dispatch(actions.editMusic(music)),
    onVote: (event, music, user) => dispatch(actions.favoriteMusic(event, music, user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPage)
