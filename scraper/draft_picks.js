require('dotenv').load();

var request = require('request');
var cheerio = require('cheerio');
var json2csv = require('json2csv');
var fs = require('fs');
var yaml = require('js-yaml');
var sleep = require('sleep');

var clubs = yaml.safeLoad(fs.readFileSync('./data/clubs.yml', 'utf8'));
var picks = [];

var save = function() {
  json2csv({ data: picks, fields: ['year', 'round', 'originalClub', 'club', 'conditionHash', 'condition'] }, function(err, csv) {
    if (err) {
      console.log(err);
    } else {
      fs.writeFile(process.env.OUTPUT_FILE, csv, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('saved');
        }
      });
    }
  });
};

clubs.forEach(function (club, idx) {
  var gfClubId = [club.geographic_name, club.distinctive_name].map(function(name) {
    return name.toLowerCase();
  }).join('-');
  
  var url = 'http://www.generalfanager.com/teams/' + gfClubId;

  request(url, function(error, response, html) {
    if (!error && response.statusCode === 200) {
      var $ = cheerio.load(html);
      var clubAbbr = club.abbr;

      var draftPickYears = $('h3:contains("Draft Picks")').siblings('.table-striped:not(:last-child)');

      draftPickYears.each(function(i, el) {
        var header = $(this).find('tr:first-child');
        var year = header.text().trim().split(' ')[0];
        var rounds = header.siblings();

        rounds.each(function(j, el) {
          var round = j + 1;

          $(this).find('td > button').each(function(k, el) {
            var split = $(this).text().replace(/\n/g, '').replace(/ +/g, ' ').trim().split(' ');
            var originalClub = split[0];

            var draftPick = {
              year: year,
              round: round,
              originalClub: originalClub,
              club: clubAbbr
            };

            if (split.length === 3) {
              var condition = $(this).siblings($(this).attr('data-target')).find('.modal-body').text();
              draftPick.conditionHash = require('crypto').createHash('md5').update(condition).digest("hex");
              draftPick.condition = condition;
            }

            picks.push(draftPick);
          });
        });
      });

      // TODO
      if (idx === 29) {
        save(picks);
      } else {
        console.log('done - sleeping for 10 ' + club.abbr);
        sleep.sleep(10);
      }
    }
  });
});

// var rows = [];
// var fields = ['birthdate', 'position', 'handedness', 'draft_team', 'draft_year', 'draft_position', 'draft_round'];

// var ids = [];
// for (var i = 1; i <= 3; i++) {
//   ids[i] = i;
// }

// for (var gfPlayerId = 0; gfPlayerId < ids.length; gfPlayerId++) {
//   request('http://www.generalfanager.com/players/' + gfPlayerId, function(error, response, html) {
//     if (!error && response.statusCode === 200) {
//       var $ = cheerio.load(html);

//       var infos = $('div.team_info > div').eq(1).text().trim().replace(/\t/g, '').split('\n');
//       var hash = {};
//       var parts;

//       for (var i = 0; i < infos.length; i++) {
//         parts = infos[i].split(/:[]/);
//         hash[parts[0].toLowerCase()] = parts[1];
//       }

//       var data = {
//         birthdate: hash.birthdate,
//         position: hash.position,
//         handedness: (hash.shoots || hash.catches).toLowerCase()
//       };

//       data.gfPlayerId = gfPlayerId + '';

//       if (hash.draft) {
//         var matches = hash.draft.match((/([0-9]{4}) ([0-9]{1})[a-z]{2} \(#([0-9]{1,3}) overall\) by ([A-Z]+)/));
//         data.draft_team = matches[4];
//         data.draft_year = matches[1];
//         data.draft_position = matches[3];
//         data.draft_round = matches[2];
//       }

//       rows.push(data);

//       json2csv({ data: rows, fields: fields }, function(err, csv) {
//         if (err) {
//           console.log(err);
//         } else {
//           fs.writeFile(process.env.OUTPUT_FILE, csv, function(err) {
//             if (err) {
//               console.log(err);
//             } else {
//               console.log('saved');
//             }
//           });
//         }
//       });
//     }
//   });
// }
