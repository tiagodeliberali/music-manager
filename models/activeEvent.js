/* start: prevState => ({
    ...prevState, isLoading: true, error: null
  }),
  finish: prevState => ({ ...prevState, isLoading: false }),
  failure: prevState => ({ ...prevState, error: payload }),
  success: prevState => prevState,
  always: prevState => prevState */

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
      await payload.data.getActiveEvent(payload.snapshotUpdate)
    },
    async favoriteMusic(payload) {
      await payload.data.favoriteMusic(payload.event, payload.music, payload.user)
    }
  }
}

export default activeEvent
