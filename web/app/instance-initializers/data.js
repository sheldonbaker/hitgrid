import leagueYears from 'hitgrid/data/league-years';
import clubs from 'hitgrid/data/clubs';

export default {
  name: 'data',

  initialize: function(application) {
    var dataSets = {
      'league-year': leagueYears,
      'club': clubs
    };

    for (let key in dataSets) {
      let dataSet = dataSets[key];

      application.lookup('service:store').pushPayload({
        data: dataSet.map(function(dataItem) {
          var id = dataItem.id;
          var attrs = dataItem;
          delete attrs.id;

          return {
            id: id,
            type: key,
            attributes: attrs
          };
        })
      });
    }
  }
};
