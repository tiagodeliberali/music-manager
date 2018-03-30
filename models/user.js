import getUser from '../services/account'

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
      try {
        this.updateUser({ isLoading: true, error: null })
        const user = await getUser(payload)
        this.updateUser({ ...user, isLoading: false, error: null })
      } catch (err) {
        this.updateUser({ isLoading: false, error: err })
      }
    }
  }
}

export default user
