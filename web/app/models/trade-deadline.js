import DS from 'ember-data';
import Commentable from 'hitgrid/mixins/commentable';

const { attr, hasMany } = DS;

export default DS.Model.extend(Commentable, {
  name: attr(),

  startsAt: attr('moment', { readOnly: true }),
  endsAt: attr('moment', { readOnly: true }),

  teamsCount: attr('number', { readOnly: true }),
  claimedTeamsCount: attr('number', { readOnly: true }),

  newsItems: hasMany('newsItem'),
  chatPosts: hasMany('chatPost'),
  
  teams: hasMany('team'),
  trades: hasMany('trade'),
  calculations: hasMany('calculation'),

  favouriteClubClaimed: attr('nullable-boolean', { readOnly: true })
});
