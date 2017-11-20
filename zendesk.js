// For more details - please check https://www.npmjs.com/package/zendesk-node-api
// All the zendesk apis this library is supporting can be seen at above link

// All the zendesk rest api can be found here https://developer.zendesk.com/rest_api/docs/core/introduction
var Zendesk = require('zendesk-node-api');

var zendesk = new Zendesk({
  url: '{your zendesk url}',
  email: '{your registered email id}',
  token: '{your api token}'
});

// Ticket reation
zendesk.tickets.create({
  subject: 'Ticket 2',
  comment: {
    body: 'Ticket 2'
  },
  external_id: 25356393, // this will be our serial id
  custom_fields: [
    {id: 114101729752, value: "GFEDCBA"}
  ]
}).then(function(result){
  console.log(result);
});


// search api
zendesk.search.list('query=type:ticket external_id:[25356393,25356392').then(function(results){
  console.log(results);
});


// ticket field creation. Custom fields. The returned id will be used to assign value to this custom field
zendesk.ticketFields.create({
    // keys and values from the zendesk docs
    // https://developer.zendesk.com/rest_api/docs/core/
    type: "text",
    title: "Serial_Number",
    visible_in_portal: true,
    required_in_portal: false,
    title_in_portal: "Serial_Number"
}).then(function(result){
  console.log(result);
})

// ticket fields list qpi
zendesk.ticketFields.list('query=type:ticket status:open').then(function(results){
  console.log(results);
    // result == true
});

// ticket list api
zendesk.tickets.list().then(function(results){
  console.log(results);
    // result == true
});

// ticket field delete
zendesk.ticketFields.delete(114101729552).then(function(result){
  console.log(results);
    // result == true
});


