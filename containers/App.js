import React, { Component, PropTypes } from "react"
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
      this.loadMusics();
    })
  }

  loadMusics = async () => {
    const musicList = await this.data.get()

    this.setState({
      term: '',
      musics: musicList,
      filteredMusic: musicList
    });
  }

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
              user={this.state.user} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
