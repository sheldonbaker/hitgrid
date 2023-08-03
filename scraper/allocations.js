var cheerio = require('cheerio');
var json2csv = require('json2csv');
var fs = require('fs');
var yaml = require('js-yaml');
var moment = require('moment');

function componentToHex(c) {
  var hex = parseInt(c, 10).toString(16).toUpperCase();
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(value) {
  if (!value) {
    return value;
  }

  if (value[0] === '#') {
    return value;
  }

  var matches = value.match(/ ?rgb\(([0-9]+), ?([0-9]+), ?([0-9]+)\)/);
  return "#" + componentToHex(matches[1]) + componentToHex(matches[2]) + componentToHex(matches[3]);
}

var leagueYears = yaml.safeLoad(fs.readFileSync('./data/league_years.yml', 'utf8'));
var leagueYear = leagueYears[0];
var leagueYearStart = moment(leagueYears[0].season_start_date);

var breakdown = fs.readFileSync('./data/hc-breakdowns/latest/edm.html', 'utf8');
var $ = cheerio.load(breakdown);

var allocations = [];
var designations = {};

var $legend = $('.p10');
var $labels = $legend.children('.mr10');

$labels.each(function() {
  var label = $(this).text().trim();

  var $value = $(this).prev();
  var colour = $value.css('background');

  designations[colour] = label;
});

var $track = $('#track_d_sect2');

$track.children().each(function() {
  if ($(this).css('line-height') !== '14px') {
    return;
  }

  var playerAllocations = [];
  var player = $(this).children().first().text().trim();
  var $slots = $(this).children().last().children();

  $slots.each(function(i) {
    if (i === 0 || rgbToHex($(this).prev().css('background')) !== rgbToHex($(this).css('background'))) {
      if (!$(this).css('background')) {
        return;
      }

      var designation = designations[rgbToHex($(this).css('background'))];

      if (designation) {
        var split = player.split(', ');

        var allocation = {
          firstName: split[1],
          lastName: split[0],
          hcStatus: designation,
          startDate: leagueYearStart.clone().add(+$(this).attr('data-col') + 1, 'days').format('YYYY-MM-DD'),
          endDate: '',
          club: 'EDM'
        };

        if (playerAllocations.length) {
          var endDate = leagueYearStart.clone().add(+$(this).prev().attr('data-col') + 1, 'days').format('YYYY-MM-DD');
          playerAllocations[playerAllocations.length - 1].endDate = endDate;
        }

        playerAllocations.push(allocation);
      }
    }
  });

  allocations = allocations.concat(playerAllocations);
});

json2csv({ data: allocations, fields: ['firstName', 'lastName', 'club', 'hcStatus', 'startDate', 'endDate'] }, function(err, csv) {
  if (err) {
    console.log(err);
  } else {
    fs.writeFile('data/allocations.csv', csv, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('saved');
      }
    });
  }
});