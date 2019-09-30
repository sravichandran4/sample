var express = require('express');
var mongodb = require('mongodb');
var path = require('path');
var router = express.Router();

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.static(__dirname + '/public'));

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

app.get('/mongodb', function(req, res, next) {
  mongodb.MongoClient.connect('mongodb://srudhir:apple1orange2@ds235401.mlab.com:35401/heroku_g73z06nf', function(err, client) {
    if(err) throw err;
    var db = client.db('heroku_g73z06nf');
    var Routes = db.collection('Routes');
    useNewUrlParser: true
    Routes.find({ frequency : { $gte: 0 } }).sort({ name: 1 }).toArray(function (err, docs) {
      if(err) throw err;
      res.render('pages/mongodb', {results: docs});
    });
    client.close(function (err) {
      if(err) throw err;
    });
  });//end of connect
});//end app.get