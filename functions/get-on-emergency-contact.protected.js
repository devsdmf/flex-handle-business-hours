const CONTACTS_LIST = [
  {
    name: 'John Doe',
    phoneNumber: '+5531993323271'
  }
];

exports.handler = (context, event, callback) => {
  const res = new Twilio.Response();
  res.appendHeader('Content-Type', 'application/json');

  // implement your logic to select a contact to redirect the call 
  
  // sample implementation using an array of contacts
  if (CONTACTS_LIST.length === 0) {
    res.setStatusCode(204);
  } else {
    res.setBody(CONTACTS_LIST[0]);
  }

  return callback(null,res);
};
