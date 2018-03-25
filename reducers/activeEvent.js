import { handle } from 'redux-pack'
import { GET_EVENT, SNAPSHOT_EVENT, TOGGLE_FAVORITE } from '../constants/ActionTypes'

const initialState = {
  isLoading: false,
  error: null
}

export default function activeEvent(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case GET_EVENT:
      return handle(state, action, {
        start: prevState => ({
          ...prevState, isLoading: true, error: null
        }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => prevState,
        always: prevState => prevState
      })

    case SNAPSHOT_EVENT:
      return Object.assign({}, state, payload)

    case TOGGLE_FAVORITE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState, isLoading: true, error: null
        }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => prevState,
        always: prevState => prevState
      })

    default:
      return state
  }
}
