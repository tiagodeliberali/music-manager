import React, { Component } from "react"
import MusicData from '../services/music-data'
import MusicPage from '../components/MusicPage'

class App extends Component {
  constructor(props) {
    super(props);

    this.data = new MusicData();
  }

  render() {
    return <MusicPage />
  }
}

export default App
