import { handle } from 'redux-pack'
import { LOGIN_USER } from '../constants/ActionTypes';

const initialState = {}

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
        success: prevState => ({ ...prevState, payload }),
        always: prevState => prevState
      })

    default:
      return state;
  }
}
