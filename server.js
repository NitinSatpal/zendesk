//using express
var express = require('express');
var app = express();
//using mongojs
var mongojs = require('mongojs');
var db = mongojs('hotspice', ['category', 'dish', 'orders']);
//using bodyparser
var bodyParser = require('body-parser');

var Zendesk = require('zendesk-node-api');

var zendesk = new Zendesk({
  url: 'https://upwork-testing.zendesk.com', // https://example.zendesk.com
  email: 'nitinsatpal@gmail.com', // me@example.com
  token: 'hi4goA89lgrkaJec55EKZpKxOHRZe2rGNV6jQNZa' // hfkUny3vgHCcV3UfuqMFZWDrLKms4z3W2f6ftjPT
});

//server should search static resource
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//GET
app.get('/hotspice/', function (req, res) {
  
});

//Post
app.post('/api/zendesk/ticket/create/', function (req, res) {
  zendesk.tickets.create({
    subject: req.body.subject,
    comment: {
      body: req.body.comment
    },
    external_id: req.body.serialNumber, // this will be our serial id
    custom_fields: [
      {id: 114101729752, value: req.body.serialNumber}
    ]
  }).then(function(result){
    if(result.ticket.id)
      res.status(200).json('Ticket created successfully');
    else
      res.status(400).json('Something went wrong');
  });
  
});


app.get('/api/zendesk/ticket/fetch/:status', function (req, res) {
  console.log(req.params.status);
  var query = '';
  if (req.params.status != 'All') {
    query = 'query=type:ticket status:' + req.params.status;
    zendesk.search.list(query).then(function(results){
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(400).json('something went wrong');
      }
    });
  } else {
    zendesk.tickets.list().then(function(results){
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(400).json('something went wrong');
      }
    });
  }
  
})

app.listen(9000);
console.log("server running on port 9000")