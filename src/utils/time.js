import moment from 'moment';

//Returns an array of dates for the month, including days from previous and next months.
export const getMonthCalendar = (date) => {
  const days = enumerateDaysForMonth(date);

  const firstDay = days[0];
  const lastDay = days[days.length - 1];

  const daysBeforeStartOfMonth = (moment(firstDay).day() || 7) - 1;
  const daysAfterEndOfMonth = 7 - moment(lastDay).day() || 7;

  const lastMonth = moment(date).subtract(1, 'month');
  const nextMonth = moment(date).add(1, 'month');

  const lastMonthDays = Array.from({ length: daysBeforeStartOfMonth }, (_, i) =>
    lastMonth
      .clone()
      .endOf('month')
      .subtract(daysBeforeStartOfMonth - i - 1, 'days')
      .toDate(),
  );

  const nextMonthDays = Array.from({ length: daysAfterEndOfMonth }, (_, i) =>
    nextMonth.clone().startOf('month').add(i, 'days').toDate(),
  );

  return [...lastMonthDays, ...days, ...nextMonthDays];
};

//Returns an array of dates for the month.
export const enumerateDaysForMonth = function (activeDate) {
  const dates = [];

  const currDate = moment(activeDate).startOf('month').subtract(1, 'day');
  const lastDate = moment(activeDate).endOf('month');

  while (currDate.add(1, 'day').diff(lastDate) < 0) {
    dates.push(currDate.clone().toDate());
  }

  return dates;
};
