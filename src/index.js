import React from "react";
import ReactDOM from "react-dom"
import injectTapEventPlugin from "react-tap-event-plugin"
import { Provider } from 'react-redux'
import { init } from '@rematch/core'
import App from '../components/App'
import * as models from '../models'

window.React = React;

injectTapEventPlugin();

const store = init({
  models
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
