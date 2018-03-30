import getUser from '../services/account'

/* start: prevState => ({
    ...prevState, isLoading: true, error: null
  }),
  finish: prevState => ({ ...prevState, isLoading: false }),
  failure: prevState => ({ ...prevState, error: payload }),
  success: prevState => Object.assign({}, prevState, payload),
  always: prevState => prevState */

const user = {
  state: {
    isLoading: false,
    error: null,
    isAdmin: () => false,
    canEdit: () => false,
    canRead: () => false,
    canVote: () => false
  },
  reducers: {
    updateUser(state, payload) {
      return Object.assign({}, state, payload)
    }
  },
  effects: {
    async getUser(payload) {
      const user = await getUser(payload)
      this.updateUser(user)
    }
  }
}

export default user
