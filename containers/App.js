import React, { Component } from "react"
import * as PropTypes from "prop-types";
// Esse proptypes eh a maneira JS de fazer static type checking, com typescript a gente não precisa, mas sem ts, eh legal usar.
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import theme from '../src/material_ui_raw_theme_file'
import Header from '../components/Header'
import MusicList from '../components/MusicList'
import musicBuilder from '../services/music-builder'
import MusicData from '../services/music-data'
import account from '../services/account'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musics: []
    }

    this.data = new MusicData();

    account(this.data, (user) => {
      this.setState({ user })
      this.loadMusics()
      this.loadActiveEvent()
    })
  }

  loadMusics = async () => {
    const musicList = await this.data.get()

    // Tiago, quanto mais usarmos state local dos componentes, menos vamos aproveitar os benefícios do redux,
    // em apps no 5a eu sempre pego no pé dos meninos para usar state local só em components, não em containers.
    this.setState({
      term: '',
      musics: musicList,
      filteredMusic: musicList
    });
  }

  loadActiveEvent = async () => {
    const activeEvent = await this.data.getActiveEvent()

    this.setState({ activeEvent });
  }

  // Esses callbacks async await resolvem o problema, mas vc perde o 'tracking' do redux,
  // A ideia eh que cada ação dessas seja registrada na store. Pq? essas coisas tendem a ficar
  // complexas com o tempo, e reproduzir bugs eh um parto, o redux te permite 'voltar no tempo', 
  // dar forward e rewind nas ações, mas desde que vc use as actions para isso.
  addMusic = async (music) => {
    const added = await this.data.add(musicBuilder(music))

    this.setState({
      musics: this.state.musics.concat(added)
    })

    this.filterMusicList(this.state.term)
  }

  editMusic = async (music) => {
    const updated = await this.data.update(musicBuilder(music))

    this.setState({
      musics: this.state.musics.map(item => item.id === music.id ? music : item)
    })

    this.filterMusicList(this.state.term)
  }
  
  favoriteMusic = async (event, music, user) => {
    await this.data.favoriteMusic(event, music, user)
    await this.loadActiveEvent()
  }

  filterMusicList = (term) => {
    const lowerTerm = (term || '').toLowerCase()

    this.setState({
      term: term,
      filteredMusic: this.state.musics.filter(music =>
        (music.name || '').toLowerCase().indexOf(lowerTerm) > -1 
        || (music.lyrics || '').toLowerCase().indexOf(lowerTerm) > -1)
    })
  }

  render() {
    const { todos, actions } = this.props;

    if (!this.state.user)
      return <div>Carregando</div>

    if (this.state.user && !this.state.user.canRead())
      return <div>Você não tem acesso a esse sistema</div>

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <div>
            <Header 
              onSave={this.addMusic} 
              onSearch={this.filterMusicList} 
              user={this.state.user} />
            <MusicList 
              musics={this.state.filteredMusic || []} 
              onSave={this.editMusic} 
              onVote={this.actionsfavoriteMusic}
              user={this.state.user} 
              event={this.state.activeEvent} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

// Exemplo:
App.PropTypes = {
  actions: PropTypes.array
}

export default App;
