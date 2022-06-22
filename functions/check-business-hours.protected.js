const { DateTime, Duration, Interval } = require('luxon');

const configPath = Runtime.getFunctions().config.path;
const {
  DEFAULT_TIMEZONE,
  BUSINESS_HOURS_START_TIME,
  BUSINESS_HOURS_END_TIME,
} = require(configPath);

exports.handler = (context, event, callback) => {
  const res = new Twilio.Response();
  res.appendHeader('Content-Type', 'application/json');

  // implement your business hours logic here...

  // sample implementation for business hours within 9am and 7pm, monday-friday
  const now = DateTime.now();
  const weekday = now.weekday;
  
  // week starts on monday with value 1 and ends on sunday with value 7
  if (weekday >= 1 && weekday <= 5) {
    const dayStart = DateTime.local({ zone: DEFAULT_TIMEZONE })
      .startOf('day')
      .plus({ hours: BUSINESS_HOURS_START_TIME });
    const duration = Duration.fromDurationLike({ hours: BUSINESS_HOURS_END_TIME - BUSINESS_HOURS_START_TIME });
    const interval = Interval.after(dayStart, duration);

    res.setBody({
      within_business_hours: interval.contains(now),
    });
  } else {
    res.setBody({ within_business_hours: false })
  }
  
  return callback(null, res);
};
