exports.handler = (context, event, callback) => {
  console.log('[redirect-call-outcome] EVENT => ', event);

  const res = new Twilio.twiml.VoiceResponse();

  const redirectUrl = `https://webhooks.twilio.com/v1` + 
    `/Accounts/${context.ACCOUNT_SID}` + 
    `/Flows/${context.DEFAULT_FLOW_SID}` + 
    `?FlowEvent=return`;

  if (event.DialCallStatus === 'completed') {
    res.redirect(`${redirectUrl}&result=success`);
  } else {
    res.redirect(`${redirectUrl}&result=failed`);
  }

  return callback(null, res);
};
