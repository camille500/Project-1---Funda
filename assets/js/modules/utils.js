const Utils = (function() {
  'use strict';

  /* BUILD THE URL FOR THE API REQUEST TO FUNDA
  ------------------------------------------------  */
  const formatCurrency = (value, type) => {
    value = value.toFixed(0).replace(/./g, function(c, i, a) {
      return i && c !== "." && ((a.length - i) % 3 === 0) ? '.' + c : c;
    });
    return `€${value}${type}`;
  }

  /* FORMAT THE STRING TO A DATE
  ------------------------------------------------  */
  const formatDate = (dateString, type) => {
    const months = ['Januari', 'Februari', 'Maart', 'Apri', 'Mei', 'Juni', 'Juli', 'Augustus', 'Oktober', 'November', 'December'];
    let date = new Date(Number(dateString.replace(/\/Date\((.*?)\+.*\)\//, '$1'))); // /Date( ... )/ to new Date
    if(type === 'date') {
      return date;
    } else {
      let monthDay = `0${date.getDate()}`;
      let month = months[date.getMonth()];
      let dateString = `${monthDay.slice(-2)} ${month} ${date.getFullYear()}`;
      return dateString;
    }
  }

  /* MAKES SURE THAT THE RETURNED FUNCTIONS CAN BE USED
  ------------------------------------------------  */
  return {
      formatCurrency: formatCurrency,
      formatDate: formatDate
  };

})();
