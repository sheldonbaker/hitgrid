import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  trades: computed('tradeDeadline', function() {
    var deadlineId = get(this, 'tradeDeadline.id');

    return this.store.filter('trade', { trade_deadline_id: deadlineId }, function(trade) {
      return trade.belongsTo('tradeDeadline').id() === deadlineId;
    });
  }),

  stats: computed('trades.@each.{playersInvolved,draftPicksInvolved,compensationInvolved}', function() {
    var trades = get(this, 'trades');

    return {
      total: get(trades, 'length'),
      playersInvolved: trades.reduce(function(m, t) { return m + get(t, 'playersInvolved'); }, 0),
      draftPicksInvolved: trades.reduce(function(m, t) { return m + get(t, 'draftPicksInvolved'); }, 0),
      compensationInvolved: trades.reduce(function(m, t) { return m + get(t, 'compensationInvolved'); }, 0)
    };
  })
});
