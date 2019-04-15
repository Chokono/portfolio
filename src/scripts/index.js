import React from 'react';
import { render } from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase';

import createHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import { Route, Switch, StaticRouter } from 'react-router-dom';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
//andrey@medibooksystems.com
import rootReducer from 'reducers';
import { routes } from './routes/routes';

const firebaseConfig = {
  apiKey: 'AIzaSyB1sS2sTcMdYXzYteMJY8d6ZhpzLwoJ3u8',
  authDomain: 'portfolio-ebbed.firebaseapp.com',
  databaseURL: 'https://portfolio-ebbed.firebaseio.com',
  projectId: 'portfolio-ebbed',
  storageBucket: 'portfolio-ebbed.appspot.com',
  messagingSenderId: '573935619408',
};

const rrfConfig = {
  countOfLike: 'likes',
};

firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(reactReduxFirebase(firebase, rrfConfig))(createStore);

const clientRender = initalState => {
  const history = createHistory();

  const middleware = routerMiddleware(history);

  const store = createStoreWithFirebase(rootReducer, initalState, applyMiddleware(middleware));

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map(route => (
            <Route
              exact={route.exact}
              path={route.path}
              key={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

render(clientRender(), document.getElementById('container'));
