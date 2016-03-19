import {List, Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function resetVote(state) {
  const roundId = state.getIn(['myVote', 'id']);
  const currentRoundId = state.getIn(['vote', 'id'], 0);
  if (roundId !== currentRoundId) {
    return state.remove('myVote');
  } else {
    return state;
  }
}

function vote(state, entry) {
  const pair = state.getIn(['vote', 'pair']);
  var currentRoundId = state.getIn(['vote', 'id']);

  if (pair && pair.includes(entry) && state.getIn(['myVote', 'id']) !== currentRoundId) {
    return state.set('myVote', Map({
      id: currentRoundId,
      entry: entry
    }));
  } else {
    return state;
  }
}

export default function (state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry)
  }
  return state;
}