import moment from 'moment';

export const formatDateDayAndDate = x => moment(x).format('dddd, MM/DD/YYYY');

export const formatDateToYYYYMMDD = value => new Date(value).toISOString().split('T')[0];
