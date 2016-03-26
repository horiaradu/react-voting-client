import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {Trainspotting: 1},
          id: 1
        }
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1},
        id: 1
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {Trainspotting: 1},
          id: 1
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1},
        id: 1
      }
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {Trainspotting: 1},
          id: 1
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1},
        id: 1
      }
    }));
  });

  it('removes myVote on SET_STATE if round id changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1},
        id: 1
      },
      myVote: {
        id: 1,
        entry: 'Trainspotting'
      }
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Sunshine', 'Slumdog Millionaire'],
          id: 2
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Sunshine', 'Slumdog Millionaire'],
        id: 2
      }
    }));
  });

  it('does not remove myVote on SET_STATE if round id remains the same', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1},
        id: 1
      },
      myVote: {
        id: 1,
        entry: 'Trainspotting'
      }
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {Trainspotting: 1},
          id: 1
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(initialState);
  });

  it("adds myVote if the state contains the user's vote", () => {
    const initialState = fromJS({
      clientId: '42'
    });

    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          votes: {
            '42': 'Trainspotting',
            '23': '28 Days Later'
          },
          pair: ['Trainspotting', '28 Days Later'],
          tally: {Trainspotting: 1, '28 Days Later': 1},
          id: 1
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      clientId: '42',
      vote: {
        votes: {
          '42': 'Trainspotting',
          '23': '28 Days Later'
        },
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1, '28 Days Later': 1},
        id: 1
      },
      myVote: {
        id: 1,
        entry: 'Trainspotting'
      }
    }));
  });

  it('handles VOTE by setting myVote', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1},
        id: 1
      }
    });
    const action = {type: 'VOTE', entry: 'Trainspotting'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1},
        id: 1
      },
      myVote: {
        id: 1,
        entry: 'Trainspotting'
      }
    }));
  });

  it('does nothing for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1},
        id: 1
      }
    });
    const action = {type: 'VOTE', entry: 'Sunshine'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1},
        id: 1
      }
    }));
  });

  it('overrides the previous vote if already voted in that round', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1},
        id: 1
      },
      myVote: {
        entry: 'Trainspotting',
        id: 1
      }
    });
    const action = {type: 'VOTE', entry: '28 Days Later'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1},
        id: 1
      },
      myVote: {
        entry: '28 Days Later',
        id: 1
      }
    }));
  });

  it('handles SET_CLIENT_ID', () => {
    const initialState = Map();
    const action = {type: 'SET_CLIENT_ID', clientId: '1234'};
    
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      clientId: '1234'
    }));
  });
});