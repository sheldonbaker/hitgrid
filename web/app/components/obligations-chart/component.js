import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  obligatables: null,
  reliefs: null,

  leagueYear: null,
  date: null,

  dailyHits: computed('leagueYear', 'obligatables.[]', function() {
    var seasonDays = get(this, 'leagueYear.seasonDays');
    var hits = [
      (new Array(seasonDays)).fill(0),
      (new Array(seasonDays)).fill(0)
    ];
    var obligatables = get(this, 'obligatables');

    obligatables.forEach((obligatable) => {
      var capHit = get(obligatable, 'capHit');
      var perfBonuses = get(obligatable, 'contract.isTwoWay') && get(obligatable, 'loaned') ? 0 : get(obligatable, 'contract.avgPerformanceBonuses');

      var cbks = [
        function(val) { return val + Math.max((capHit - perfBonuses), 0); },
        function(val) { return val + perfBonuses; }
      ];

      var start = get(obligatable, 'startSeasonDay');
      var end = get(obligatable, 'endSeasonDay');

      cbks.forEach((cbk, i) => {
        var sliced = hits[i].slice(start, end + 1);
        var mapped = sliced.map((hit) => { return cbk(hit); });

        var args = [start, end + 1 - start];
        args = args.concat(mapped);
        Array.prototype.splice.apply(hits[i], args);
      });
    });

    return hits;
  }),

  dailyReliefs: computed('leagueYear', 'reliefs.content.[]', function() {
    var amounts = new Array(get(this, 'leagueYear.seasonDays')).fill(0);

    get(this, 'reliefs.content').forEach((relief) => {
      var start = get(relief, 'startSeasonDay');
      var end = get(relief, 'endSeasonDay');

      var sliced = amounts.slice(start, end + 1);
      var mapped = sliced.map((amount) => { return amount + get(relief, 'contractYear.avgValue'); });

      var args = [start, end + 1 - start];
      args = args.concat(mapped);
      Array.prototype.splice.apply(amounts, args);
    });

    return amounts;
  }),

  dailyLowerLimit: computed('leagueYear', function() {
    return (new Array(get(this, 'leagueYear.seasonDays'))).fill(0).map(() => {
      return get(this, 'leagueYear.lowerLimit');
    });
  }),

  dailyUpperLimit: computed('leagueYear', function() {
    return (new Array(get(this, 'leagueYear.seasonDays'))).fill(0).map(() => {
      return get(this, 'leagueYear.upperLimit');
    });
  }),

  dailyBonusCushion: computed('leagueYear', function() {
    return (new Array(get(this, 'leagueYear.seasonDays'))).fill(0).map(() => {
      return get(this, 'leagueYear.bonusCushion');
    });
  }),

  data: computed('leagueYear', 'obligatables.[]', 'reliefs.[]', function() {
    var leagueYear = get(this, 'leagueYear');

    return {
      x: 'date',
      columns: [
        ['date'].concat(get(leagueYear, 'seasonDates')),
        ['lowerLimit'].concat(get(this, 'dailyLowerLimit')),
        ['upperLimit'].concat(get(this, 'dailyUpperLimit')),
        ['ltirRelief'].concat(get(this, 'dailyReliefs')),
        ['bonusCushion'].concat(get(this, 'dailyBonusCushion')),
        ['nonPerformanceBonuses'].concat(get(this, 'dailyHits')[0]),
        ['performanceBonuses'].concat(get(this, 'dailyHits')[1]),
      ],
      type: 'area',
      types: {
        lowerLimit: 'spline',
        upperLimit: 'spline',
        ltirRelief: 'spline',
        bonusCushion: 'spline'
      },
      groups: [
        ['nonPerformanceBonuses', 'performanceBonuses'],
        ['upperLimit', 'ltirRelief', 'bonusCushion']
      ],
      order: null,
      colors: {
        ltirRelief: '#FF0000'
      }
    };
  }),

  axis: computed(function() {
    var leagueYear = get(this, 'leagueYear');

    return {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        }
      },

       y: {
        min: get(leagueYear, 'lowerLimit') + 1000000,
        max: get(leagueYear, 'upperLimit') + get(leagueYear, 'bonusCushion') + 5000000,
        tick: {
          format: function(value) {
            return ['$', value.toLocaleString()].join('');
          }
        }
       }
    };
  }),

  grid: computed('leagueYear.{lowerLimit,upperLimit}', function() {
    var leagueYear = get(this, 'leagueYear');

    return {
      x: {
        lines: [
          { value: get(this, 'date').format('YYYY-MM-DD'), text: 'Current' },
          { value: get(leagueYear, 'tradeDeadlineDate').format('YYYY-MM-DD'), text: 'Trade Deadline' }
        ]
      },

      y: {
        lines: [
          { value: get(leagueYear, 'lowerLimit'), text: 'Lower limit' },
          { value: get(leagueYear, 'upperLimit'), text: 'Upper limit' },
          { value: get(leagueYear, 'upperLimit') + get(leagueYear, 'bonusCushion'), text: 'Bonus Cushion' }
        ]
      }
    };
  }),

  zoom: {
    enabled: true
  },

  subchart: {
    show: true
  },


});
