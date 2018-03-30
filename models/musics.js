import musicBuilder from '../services/music-builder'

const musics = {
  state: {
    isLoading: false,
    error: null
  },
  reducers: {
    updateMusic(state, payload) {
      return Object.assign({}, state, { list: payload })
    },
    setAsyncInfo(state, payload) {
      return Object.assign({}, state, payload)
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
      try {
        this.setAsyncInfo({ isLoading: true, error: null })
        await payload.data.get(this.updateMusic, payload.filterMusics)
        this.setAsyncInfo({ isLoading: false, error: null })
      } catch (err) {
        this.setAsyncInfo({ isLoading: false, error: err })
      }
    }
  }
}

export default musics
