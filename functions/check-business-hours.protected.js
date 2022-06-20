const { DateTime, Duration, Interval } = require('luxon');

const DEFAULT_TIMEZONE = 'America/Sao_Paulo';
const BUSINESS_HOURS_START_TIME = { hours: 9 };
const BUSINESS_HOURS_DURATION = { hours: 10 }; // the duration will be the end time being (START_TIME + DURATION)

exports.handler = (context, event, callback) => {
  const res = new Twilio.Response();
  res.appendHeader('Content-Type', 'application/json');

  // implement your business hours logic here...

  // sample implementation for business hours within 9am and 7pm, monday-friday
  const now = DateTime.now();
  const weekday = now.weekday;
  
  // week starts on monday with value 1 and ends on sunday with value 7
  if (weekday >= 1 && weekday <= 5) {
    const interval = Interval.after(
      DateTime.local({ zone: DEFAULT_TIMEZONE }).startOf('day').plus(BUSINESS_HOURS_START_TIME),
      Duration.fromDurationLike(BUSINESS_HOURS_DURATION)
    );

    res.setBody({
      within_business_hours: interval.contains(now),
    });
  } else {
    res.setBody({ within_business_hours: false })
  }
  
  return callback(null, res);
};
