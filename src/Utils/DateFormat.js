import moment from 'moment';

export const formatDateDayAndDate = x => moment(x).format('dddd, M/D/YYYY');

export const formatMMDDYYYY = x => moment(x).format('L')

export const formatDateForServer = value => {
  const reWhiteSpace = new RegExp("\\s+");
  const formatted = reWhiteSpace.test(value) ? value.split(' / ') : value.split('/');
  return new Date(formatted[2],parseInt(formatted[0])-1,formatted[1]).toISOString().split('T')[0];
}
