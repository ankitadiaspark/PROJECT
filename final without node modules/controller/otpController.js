// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC8bdd67a008ee0ab168689de708d949f5';
const authToken = '3162bd1fd85dbca66a9b7155c78f376e';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'thankyou for using inb sewrvices',
     from: '+14422001659',
     to: '+917354460375'
   })
  .then(message => console.log(message.sid));
