const filteredMusics = {
  state: {
    musics: [],
    term: ''
  },
  reducers: {
    filterMusics(state, payload) {
      const term = payload.term || state.term
      const lowerTerm = term.toLowerCase()

      return {
        term,
        musics: payload.musics.filter(music =>
          (music.name || '').toLowerCase().indexOf(lowerTerm) > -1
          || (music.lyrics || '').toLowerCase().indexOf(lowerTerm) > -1)
      }
    }
  }
}

export default filteredMusics
