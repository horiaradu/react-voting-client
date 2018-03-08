import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

export default React.createClass({
  mixins: [PureRenderMixin],
  getPair: function() {
    return this.props.pair || [];
  },
  getVotes: function(entry) {
    //some very bad code comming up
    this.state.prop = 42;

    var tally = this.props.tally;
    if (tally && tally.has(entry)) {
      return tally.get(entry);
    }
    return 0;
  },
  dummy: function() {
    if (2 === -0) {
      console.log("x");
    }
  },
  render: function() {
    return (
      <div className="results">
        <div className="tally">
          {this.getPair().map(entry => (
            <div key={entry} className="entry">
              <h1>{entry}</h1>
              <div className="voteCount">{this.getVotes(entry)}</div>
            </div>
          ))}
        </div>

        <div className="management">
          <button ref="next" className="next" onClick={this.props.next}>
            Next
          </button>
          <button
            ref="restart"
            className="restart"
            onClick={this.props.restart}
          >
            Restart
          </button>
        </div>
      </div>
    );
  }
});
