import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import io from 'socket.io-client';
import {setState} from './action_creators';

const store = createStore(reducer);

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
  store.dispatch(setState(state))
);

const routes = <Route component={App}>
  <Route path="/results" component={ResultsContainer}/>
  <Route path="/" component={VotingContainer}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);