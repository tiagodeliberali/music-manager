const activeEvent = {
  state: {
    isLoading: false,
    error: null
  },
  reducers: {
    snapshotUpdate(state, payload) {
      return Object.assign({}, state, payload)
    }
  },
  effects: {
    async getActiveEvent(payload) {
      try {
        this.snapshotUpdate({ isLoading: true, error: null })
        await payload.data.getActiveEvent(payload.snapshotUpdate)
        this.snapshotUpdate({ isLoading: false, error: null })
      } catch (err) {
        this.snapshotUpdate({ isLoading: false, error: err })
      }
    },
    async favoriteMusic(payload) {
      await payload.data.favoriteMusic(payload.event, payload.music, payload.user)
    }
  }
}

export default activeEvent
