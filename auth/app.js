require('dotenv').load();

var express = require('express');
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  },
  
  function(token, tokenSecret, profile, cb) {
    return cb(null, { requestToken: token, requestTokenVerifier: tokenSecret });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var app = express();
app.use(cors({
  origin: process.env.WEB_URL
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/twitter', passport.authenticate('twitter'));

app.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/twitter/failure', successRedirect: '/twitter/success' }));

app.get('/twitter/failure', function(req, res) {
  res.redirect(process.env.WEB_URL);
});

app.get('/twitter/success', function(req, res) {
  var auth = req.session.passport.user;
  res.redirect(process.env.WEB_URL + '/?token=' + auth.requestToken + '&verifier=' + auth.requestTokenVerifier);
});

app.post('/push_notification_receipts', function(req, res) {
  var tokenValue = req.cookies.access_token;

  var options = {
    method: 'POST',
    url: process.env.API_URL + '/api/v1/push_notification_receipts',
    headers: {
      'Authorization': 'Token token="%s"'.replace('%s', tokenValue),
      'Content-Type': "application/vnd.api+json"
    },
    body: {
      data: {
        type: 'push-notification-receipts',
        attributes: {
          subscription_endpoint: req.body.pushNotificationReceipt.subscriptionEndpoint
        }
      }
    },
    json: true
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode === 201) {
      var included = body.included[0];
      var pushNotification = included.attributes;
      pushNotification.id = included.id;

      var receipt = { id: body.data.id, push_notification_id: pushNotification.id };

      res.json({ push_notification_receipt: receipt, push_notifications: [pushNotification] });
    } else {
      res.writeHead(response.statusCode);
    }
  });
});

app.post('/push_keys', function(req, res) {
  var options = {
    method: 'POST',
    url: process.env.API_URL + '/api/v1/push_keys',
    headers: {
      'Authorization': req.headers.authorization,
      'Content-Type': "application/vnd.api+json"
    },
    body: {
      data: {
        type: 'push-keys',
        attributes: req.body
      }
    },
    json: true
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json(body.data.attributes.auth);
    } else {
      res.writeHead(response.statusCode);
    }
  });
});

app.listen(3001);
