import Ember from 'ember';
const { Route, get } = Ember;

export default Route.extend({
  model(params) {
    return this.store.findRecord('trade', params.id);
  },

  afterModel(trade) {
    var tradeId = get(trade, 'id');

    trade.markAsRead();

    this.readContinuously = this.reading.start((record) => {
      return record.constructor.modelName === 'trade' && get(record, 'id') === tradeId;
    });
  },

  deactivate() {
    this.reading.stop(this.readContinuously);
  },
});
