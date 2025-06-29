import dayjs from 'dayjs';
import 'dayjs/locale/sr';
import relativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekday from 'dayjs/plugin/weekday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

// Configure dayjs with Serbian locale and plugins
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// Set Serbian locale
dayjs.locale('sr');

// Serbian month names
const serbianMonths = [
  'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
  'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
];

// Serbian day names
const serbianWeekdays = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
const serbianWeekdaysShort = ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'];

export { dayjs, serbianMonths, serbianWeekdays, serbianWeekdaysShort };

export const formatDate = (date: string | dayjs.Dayjs, format: string = 'DD.MM.YYYY') => {
  return dayjs(date).format(format);
};

export const formatDateTime = (date: string | dayjs.Dayjs, time?: string) => {
  const dateObj = dayjs(date);
  if (time) {
    return `${dateObj.format('dddd, DD.MM.YYYY')} u ${time}`;
  }
  return dateObj.format('dddd, DD.MM.YYYY');
};

export const isDateAvailable = (date: string | dayjs.Dayjs) => {
  const dateObj = dayjs(date);
  const today = dayjs();
  const maxDate = today.add(30, 'day');
  
  return dateObj.isSameOrAfter(today, 'day') && dateObj.isSameOrBefore(maxDate, 'day');
};
