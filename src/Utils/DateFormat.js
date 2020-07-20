import moment from 'moment';

export const formatDateDayAndDate = x => moment(x).format('dddd, M/D/YYYY');

export const formatDateToYYYYMMDD = value => new Date(value).toISOString().split('T')[0];
