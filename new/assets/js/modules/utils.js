const Utils = (function() {

  /* BUILD THE URL FOR THE API REQUEST TO FUNDA
  ------------------------------------------------  */
  const formatCurrency = (value) => {
    value = value.toFixed(0).replace(/./g, function(c, i, a) {
      return i && c !== "." && ((a.length - i) % 3 === 0) ? '.' + c : c;
    });
    return `€${value},-`;
  }

  const formatDate = (date) => {
    date = date.split('/Date(').pop().split(')/').shift();
    console.log(date)
    //return `${date.getFullYear()}`
  }

  return {
      formatCurrency: formatCurrency,
      formatDate: formatDate
  };

})();
