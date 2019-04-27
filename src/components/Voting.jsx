import React from "react";
import Winner from "./Winner";
import Vote from "./Vote";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { connect } from "react-redux";
import * as actionCreators from "../action_creators";

export const Voting = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return (
      <div>
        {this.props.winner ? (
          <Winner ref="winner" winner={this.props.winner} trueAttr />
        ) : (
          <Vote ref="vote" {...this.props} trueAttr />
        )}
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    pair: state.getIn(["vote", "pair"]),
    hasVoted: state.getIn(["myVote", "entry"]),
    winner: state.get("winner")
  };
}

function f() {
  try {
    1 + 1;
  } catch (e) {
    console.log("don't remove me: ", e);
  }
  console.log("i will be gone");
}

export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);
