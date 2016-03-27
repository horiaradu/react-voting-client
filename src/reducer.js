import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function handleVote(state) {
  if (state.has('myVote')) {
    return removeVote(state);
  } else {
    return addVote(state);
  }
}

function removeVote(state) {
  const roundId = state.getIn(['myVote', 'id']);
  const currentRoundId = state.getIn(['vote', 'id']);
  if (roundId !== currentRoundId) {
    return state.remove('myVote');
  } else {
    return state;
  }
}

function addVote(state) {
  const currentRoundId = state.getIn(['vote', 'id']);
  const hasVoted = state.getIn(['vote', 'votes', state.get('clientId')]);

  if (hasVoted) {
    return state.set('myVote', Map({
      id: currentRoundId,
      entry: hasVoted
    }));
  } else {
    return state;
  }
}

function vote(state, entry) {
  const pair = state.getIn(['vote', 'pair']);
  var currentRoundId = state.getIn(['vote', 'id']);

  if (pair && pair.includes(entry)) {
    return state.set('myVote', Map({
      id: currentRoundId,
      entry: entry
    }));
  } else {
    return state;
  }
}

function setClientId(state, clientId) {
  return state.set('clientId', clientId);
}

function setConnectionState(state, connectionState, connected) {
  return state.set('connection', Map({
    state: connectionState,
    connected
  }));
}


export default function (state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return handleVote(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry);
    case 'SET_CLIENT_ID':
      return setClientId(state, action.clientId);
    case 'SET_CONNECTION_STATE':
      return setConnectionState(state, action.connectionState, action.connected);
  }
  return state;
}