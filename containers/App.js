import React, { Component, PropTypes } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../src/material_ui_raw_theme_file'

import Header from '../components/Header';
import MusicList from '../components/MusicList';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musics: []
    }

    this.loadMusics('');
  }

  loadMusics = (term) => {
    setTimeout(() => {
      this.setState({
        musics: [{
          id: '1',
          name: 'Faz chover',
          lyrics: 'Assim como a corsa\nAnseia por água',
          youtube: 'https://www.youtube.com/watch?v=f097WHc7h3g',
          hasTransparency: true
        },
        {
          id: '2',
          name: 'Fico feliz',
          lyrics: 'Fico feliz em vir em Sua casa\nErguer minhas mãos e cantar, Aleluia!',
          youtube: 'https://www.youtube.com/watch?v=4P-kQrmj6k8',
          hasTransparency: false
        }]
      });
    }, 500);
  }

  addMusic = (music) => {
    this.setState({
      musics: this.state.musics.concat({
        id: this.state.musics.length + 1,
        name: music.name,
        lyrics: music.lyrics,
        youtube: music.youtube,
        hasTransparency: music.hasTransparency
      })
    })
  }

  editMusic = (music) => {
    this.setState({
      musics: this.state.musics.map(item => 
        item.id === music.id 
          ? Object.assign({}, item, { 
            name: music.name,
            lyrics: music.lyrics,
            youtube: music.youtube,
            hasTransparency: music.hasTransparency
          }) 
          : item)
    })
  }

  render() {
    const { todos, actions } = this.props;
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <div>
            <Header onSave={this.addMusic} />
            <MusicList musics={this.state.musics} onSave={this.editMusic} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
