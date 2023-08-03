import Ember from 'ember';
import DS from 'ember-data';
import Negotiable from 'hitgrid/mixins/negotiable';

const { get } = Ember;
const { belongsTo, hasMany } = DS;

export default DS.Model.extend(Negotiable, {
  counter: belongsTo('proposal', { inverse: 'countered' }),
  countered: belongsTo('proposal', { inverse: 'counter' }),
  trade: belongsTo('trade', { async: true }),

  messages: hasMany('message', { async: true }),

  buildCounter(proposal, team) {
    var counter = this.store.createRecord('proposal', {
      tradeDeadline: get(proposal, 'tradeDeadline'),
      date: get(team, 'date'),
      countered: proposal
    });
    
    get(proposal, 'participations').forEach((participation) => {
      var counterParticipation = get(counter, 'participations').createRecord({
        negotiable: counter,
        initiating: !(get(participation, 'initiating')),
        team: get(participation, 'team')
      });

      get(participation, 'ingredients').forEach((ingredient) => {
        get(counterParticipation, 'ingredients').createRecord({
          assetable: get(ingredient, 'assetable'),
          provisionable: get(ingredient, 'provisionable')
        });
      });
    });

    return counter;
  }
});