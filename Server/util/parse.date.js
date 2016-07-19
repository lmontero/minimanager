/**
 * Created by Luis Montero on 7/18/2016.
 */
function parseFromDateTimeToDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var newDay = day < 10 ? ('0' + day) : ('' + day);
  var newMonth = month < 10 ? ('0' + month) : ('' + month);
  var newYear = '' + year;

  return newDay + '/' + newMonth + '/' + newYear;
}

module.exports = {
  parseFromDateTimeToDate: parseFromDateTimeToDate
};