import { handle } from 'redux-pack'
import { ADD_MUSIC, UPDATE_MUSIC, SET_EXECUTED_MUSIC, GET_MUSICS, SNAPSHOT_MUSICS } from '../constants/ActionTypes';

const initialState = {
  isLoading: false,
  error: null,
  list: []
}

export default function todos(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case ADD_MUSIC:
      return handle(state, action, {
        start: prevState => ({
          ...prevState, isLoading: true, error: null
        }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => prevState,
        always: prevState => prevState
      })

    case UPDATE_MUSIC:
      return handle(state, action, {
        start: prevState => ({
          ...prevState, isLoading: true, error: null
        }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => prevState,
        always: prevState => prevState
      })

    case SET_EXECUTED_MUSIC:
      return handle(state, action, {
        start: prevState => ({
          ...prevState, isLoading: true, error: null
        }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => prevState,
        always: prevState => prevState
      })

    case GET_MUSICS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState, isLoading: true, error: null
        }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => prevState,
        always: prevState => prevState
      })

    case SNAPSHOT_MUSICS:
      return Object.assign({}, state, { list: payload })

    default:
      return state;
  }
}
