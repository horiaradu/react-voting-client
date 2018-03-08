import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

export default React.createClass({
  mixins: [PureRenderMixin],
  componentDidUpdate: function() {
    this.setState({ a: 3 });
  },
  render: function() {
    return <div ref="winner">Winner is {this.props.winner}!</div>;
  }
});
