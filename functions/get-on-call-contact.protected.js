const helpersPath = Runtime.getFunctions().helpers.path;
const {
  getContacts
} = require(helpersPath);

exports.handler = (context, event, callback) => {
  const res = new Twilio.Response();
  res.appendHeader('Content-Type', 'application/json');

  // implement your logic to select a contact to redirect the call 
  
  // sample implementation using an array of contacts
  const contacts = getContacts();
  if (contacts.length === 0) {
    res.setStatusCode(204);
  } else {
    res.setBody(contacts[0]);
  }

  return callback(null,res);
};

