const Requests = (function() {
  'use strict';

  /* XMLHTTPREQUEST FOR GETTING THE DESIRED DATA
  ------------------------------------------------  */
  const get = (url, type) => {
    const request = config.request;
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText);
        console.log(data);
        checkData(data, type);
      } else {
        console.log('error');
      }
    };
    /* ERROR HANDLING
    ------------------------------------------------  */
    request.onerror = function() {
      console.log('error');
    };
    request.send();
  }

  /* CHECK WHAT KIND OF DATA HAS RETURNED AND DESIDE WHAT TO DO WITH IT
  ------------------------------------------------  */
  const checkData = (data, type) => {
    if(type === 'location') {
      UserLocation.toString(data);
    } else if(type === 'list') {
      Funda.cleanList(data);
    } else {
      Funda.cleanDetail(data);
    }
  }

  /* MAKES SURE THAT THE RETURNED FUNCTIONS CAN BE USED
  ------------------------------------------------  */
  return {
      get: get,
      checkData: checkData
  };

})();
