var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var port = process.env.PORT || 8080;
var pg = require( 'pg' );
var connectionString = 'postgres://localhost:5432/Koala';
// static folder
app.use( express.static( 'public' ) );

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( 'index.html' );
});

// get koalas
app.get( '/getKoalas', function( req, res ){
  console.log( 'getKoalas route hit' );
  //assemble object to send
pg.connect( connectionString, function( err, client, done){
  if(err){
    console.log('ERROR');
  } else{
    console.log('in that DB');
    var query = client.query('SELECT * FROM koalas');

    var koalasArr = [];
    query.on('row', function(row){
      koalasArr.push(row);
    });
    query.on('end',function(){
      done();
      console.log(koalasArr);

      res.send(koalasArr);
    });
  }
});
});

// add koala
app.post( '/addKoala', urlencodedParser, function( req, res ){
  console.log( 'addKoala route hit', req.body);
  //assemble object to send
pg.connect(connectionString, function(err, client, done){
  if(err){
    console.log('Ya broke it');
  }else{
    console.log('Connected!');
    client.query( 'INSERT INTO koalas(name, sex, age, transfer, notes) values ($1, $2, $3, $4, $5)', [req.body.name, req.body.sex, req.body.age, req.body.readyForTransfer, req.body.notes] );
    done();
    res.send('Ya didnt break it');
  }

});

});

// add koala
app.put( '/editKoala', urlencodedParser, function( req, res ){
  console.log( 'editKoala route hit' );
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('Ya broke it');
    }else{
      console.log('Connected! edit');
      client.query( 'UPDATE koalas SET (name, sex, age, transfer, notes) = ($1, $2, $3, $4, $5) WHERE name = ($1)', [req.body.name, req.body.sex, req.body.age, req.body.readyForTransfer, req.body.notes] );
      done();
      res.send('Ya didnt break it');

    }
});
});
