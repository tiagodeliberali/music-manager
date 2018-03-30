import musicBuilder from '../services/music-builder'

/* start: prevState => ({
    ...prevState, isLoading: true, error: null
  }),
  finish: prevState => ({ ...prevState, isLoading: false }),
  failure: prevState => ({ ...prevState, error: payload }),
  success: prevState => Object.assign({}, prevState, payload),
  always: prevState => prevState */

const musics = {
  state: {
    isLoading: false,
    error: null
  },
  reducers: {
    updateMusic(state, payload) {
      return Object.assign({}, state, { list: payload })
    }
  },
  effects: {
    async addMusic(payload) {
      await payload.data.add(musicBuilder(payload.music))
    },
    async editMusic(payload) {
      await payload.data.update(musicBuilder(payload.music))
    },
    async toggleExecuted(payload) {
      await payload.data.toggleExecuted(musicBuilder(payload.music), payload.event)
    },
    async loadMusics(payload) {
      await payload.data.get(this.updateMusic, payload.filterMusics)
    }
  }
}

export default musics
