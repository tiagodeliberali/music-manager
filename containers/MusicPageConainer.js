import { connect } from 'react-redux'
import MusicPage from '../components/MusicPage'
import MusicData from '../services/music-data'

const data = new MusicData()

const mapStateToProps = state => ({
  musics: state.musics,
  filteredMusics: state.filteredMusics,
  user: state.user,
  activeEvent: state.activeEvent
})

const mapDispatchToProps = ({
  activeEvent: { getActiveEvent, favoriteMusic, snapshotUpdate },
  filteredMusics: { filterMusics },
  user: { getUser },
  musics: {
    addMusic, editMusic, toggleExecuted, loadMusics
  }
}) => {
  // TODO: Move it to a proper place
  getUser(data)
  loadMusics({ data, filterMusics })
  getActiveEvent({ data, snapshotUpdate })

  return {
    onSearch: musics => term => filterMusics({ data, term, musics }),
    onAddMusic: music => addMusic({ data, music }),
    onUpdateMusic: music => editMusic({ data, music }),
    onExecuted: (music, event) => toggleExecuted({ data, music, event }),
    onVote: (event, music, user) => favoriteMusic({
      data, event, music, user
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPage)
