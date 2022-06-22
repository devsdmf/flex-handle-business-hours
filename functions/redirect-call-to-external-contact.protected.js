const helpersPath = Runtime.getFunctions().helpers.path;
const {
  getDomain,
  getContacts,
} = require(helpersPath);

exports.handler = (context, event, callback) => {
  console.log('[redirect-call-to-external-contact] EVENT => ', event);
  const res = new Twilio.twiml.VoiceResponse();

  res.say('Sorry, none of our agents are available at this moment...');

  // sample implementation to get a on call contact
  const contacts = getContacts();

  if (contacts.length > 0) {
    const contact = contacts[0];

    res.say(`We are trying to contact ${contact.name}, please, wait a moment...`);

    res.dial({
      callerId: context.DEFAULT_CALLER_ID,
      action: `${getDomain(context)}/redirect-call-outcome`,
      record: 'record-from-answer',
      recordingStatusCallback: `${getDomain(context)}/redirect-call-recording-callback`,
    }, contact.phoneNumber);
  } else {
    const redirectUrl = `https://webhooks.twilio.com/v1` + 
      `/Accounts/${context.ACCOUNT_SID}` + 
      `/Flows/${context.DEFAULT_FLOW_SID}` + 
      `?FlowEvent=return&result=unavailable`;
    res.redirect(redirectUrl);
  }

  return callback(null,res);
};
