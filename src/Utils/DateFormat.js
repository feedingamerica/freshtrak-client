import moment from 'moment';

export const formatDateDayAndDate = x => moment(x).format('dddd, M/D/YYYY');

export const formatDateToYYYYMMDD = value => new Date(value).toISOString().split('T')[0];

export const formatDateForServer = value => {
  const formatted = value.split(' / ');
  return new Date(formatted[2],formatted[0],formatted[1]).toISOString().split('T')[0];
}
