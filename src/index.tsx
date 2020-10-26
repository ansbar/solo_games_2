import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from 'app/store'
import language from "assets/languages/swedish.json";
import * as serviceWorker from 'serviceWorker';
import 'index.css';

const render = () => {
    const App = require('./app/App').default
  
    ReactDOM.render(
      <Provider store={store}>
        <App lang={language} />
      </Provider>,
      document.getElementById('root')
    )
}
  
render()

if (process.env.NODE_ENV === 'development' && module.hot)
    module.hot.accept('./app/App', render)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
