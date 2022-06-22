exports.handler = (context, event, callback) => {
  console.log('[redirect-call-recording-callback] Event => ', event);

  const res = new Twilio.Response();
  return callback(null, res);
};
