import { handle } from 'redux-pack'
import { LOGIN_USER } from '../constants/ActionTypes';

const initialState = {
  isLoading: false,
  error: null
}

initialState.canEdit = () => false
initialState.canRead = () => false
initialState.canVote = () => false

export default function user(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case LOGIN_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState, isLoading: true, error: null
        }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => Object.assign({}, prevState, payload),
        always: prevState => prevState
      })

    default:
      return state;
  }
}
