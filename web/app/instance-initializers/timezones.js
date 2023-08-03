import timezones from 'hitgrid/data/moment-timezones';
const { moment } = window;

export default {
  name: 'timezones',

  initialize: function() {
    timezones.forEach((timezone) => {
      moment.tz.add(timezone);
    });
  }
};
