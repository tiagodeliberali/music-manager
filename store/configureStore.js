import { createStore, applyMiddleware, compose } from 'redux'
import { middleware as reduxPackMiddleware } from 'redux-pack'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(reduxPackMiddleware))
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = rootReducer
      store.replaceReducer(nextReducer)
    });
  }

  return store;
}
