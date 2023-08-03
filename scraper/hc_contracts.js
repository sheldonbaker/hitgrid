var request = require('request');
var cheerio = require('cheerio');
var json2csv = require('json2csv');
var fs = require('fs');
var sleep = require('sleep');

var urlForTeam = function(team_id) {
  return 'https://hockeyscap.com/teams/' + team_id + '/cap_tracker';
};

var urlForPlayer = function(player_id) {
  return 'https://hockeyscap.com/players/' + player_id;
};

var requestOptionsForUrl = function(url) {
  var userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36";

  return {
    url: url,
    headers: {
      'Accept': 'text/html',
      'User-Agent': userAgent,
      'Referer': url
    }
  };
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

var rows = [];

request(requestOptionsForUrl(urlForTeam('oilers')), function(error, response, html) {
  var playerIds = [];

  var $ = cheerio.load(html);
  var $track = $('#track_d_sect2');
  
  var $rows = $track.children().filter(function() {
    return $(this).attr('style') === 'border-bottom:1px solid #fff;overflow:hidden;line-height:14px';
  });

  $rows.each(function() {
    var $name = $(this).children().first();
    
    var name = $name.text().trim();
    var split = name.split(', ');
    var id = [split[1].toLowerCase(), split[0].toLowerCase()].join('_').replace('-', '_');

    playerIds.push(id);
  });

  // filter dupes
  playerIds = playerIds.filter(function(e, i, arr) {
    return arr.lastIndexOf(e) === i;
  });

  var foo = function(idx, callback) {
    request(requestOptionsForUrl(urlForPlayer(playerIds[idx])), function(error, response, html) {
      var $ = cheerio.load(html);
      var $wrapper = $('.p10').first();

      var player = {};
      var contract = {};
      var contractYears = [];

      var $header = $wrapper.children().first();
      var $positions = $header.children('.l.flare');
      var $team = $header.find('.hid_anc');

      var playerName = $header.children().first().text().replace(/ #[0-9]+/, '').toLowerCase();
      player.firstName = playerName.split(' ')[0].capitalize();
      player.lastName = playerName.split(' ').slice(1).map(function(name) { return name.capitalize(); }).join(' ');

      player.positions = $positions.text().split(/, ?/);
      contract.team = $team.text();

      var $info = $header.next();
      var $rows = $info.children('.l');

      $rows.each(function() {
        var key = $(this).children('span').text().trim();
        var value = $(this).clone().children().remove().end().text();

        if (key === 'Drafted') {
          value = value.replace('()', '(' + $(this).children('a').text() + ')');
        }

        player[key] = value;
      });

      var $table = $wrapper.find('.table_c').eq(0);
      var $head = $table.find('.column_head3.cntrct').children().first();
      var $typeKey = $head.children().filter(function() {
        return $(this).text().trim() === 'TYPE:';
      });

      contract.type = $typeKey.next().text();
      contract.expiryStatus = $head.children().last().prev().prev().text();
      contract.source = $head.children().last().prev().text();

      var $heads = $table.find('.column_head td');
      var $years = $table.find('table.cntrct').find('tr').not('.column_head');

      var contractYearFields = [];

      $heads.each(function() {
        contractYearFields.push($(this).clone().children().remove().end().text().trim());
      });

      $years.each(function() {
        var contractYear = {};

        $(this).children().each(function(i) {
          var colspan = $(this).attr('colspan');
          var text = $(this).clone().children().remove().end().text().trim();
          
          if (colspan) {
            for (var j = 0; j < colspan; j++) {
              contractYear[contractYearFields[i + j]] = text;  
            }
          } else {
            var sum = $(this).prevAll().map(function() {
              return +$(this).attr('colspan') || 1;
            }).get().reduce(function(a, b) {
              return a + b;
            }, 0);

            contractYear[contractYearFields[sum]] = text;
          }
        });

        contractYears.push(contractYear);
      });

      // 

      contractYears.forEach(function(contractYear) {
        var row = {
          playerFirstName: player.firstName,
          playerLastName: player.lastName,
          playerPositions: player.positions.join(','),
          playerBorn: player['Born'],
          playerHeight: player['Height'],
          playerWeight: player['Weight'],
          playerShoots: player['Shoots'] || player['Catches'],
          playerDrafted: player['Drafted'],
          contractType: contract.type,
          season: contractYear.SEASON,
          clause: contractYear.CLAUSE,
          ahlSalary: contractYear['AHL SALARY'],
          nhlSalary: contractYear['NHL SALARY'],
          performanceBonuses: contractYear['P. BONUSES'],
          signingBonuses: contractYear['S. BONUSES'],
          AAV: contractYear.AAV,
          capHit: contractYear['CAP HIT']
        };

        rows.push(row);
      });

      if (idx + 1 === playerIds.length) {
        json2csv({ data: rows, fields: rows[0].keys }, function(err, csv) {
          if (err) {
            console.log(err);
          } else {
            fs.writeFile('data/contract_years.csv', csv, function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('saved');
              }
            });
          }
        });
      } else {
        sleep.sleep(10 + Math.floor(Math.random() * 5));
        console.log('sleeping');
        
        foo(idx + 1);
      }
    });
  };

  foo(0);
});
