const Requests = (function() {
  'use strict';

  /* XMLHTTPREQUEST FOR GETTING THE DESIRED DATA
  ------------------------------------------------  */
  const get = (url, type) => {
    elements.loader.classList.remove('hidden');
    const request = config.request; // XMLHttpRequest
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText);
        checkData(data, type); // Check what kind of dataset it returns
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
      UserLocation.toString(data); // Handle user location data
    } else if(type === 'list') {
      console.log(data);
      Funda.cleanList(data); // Handle list data
    } else {
      Funda.cleanDetail(data); // Handle detail data
    }
  }

  /* MAKES SURE THAT THE RETURNED FUNCTIONS CAN BE USED
  ------------------------------------------------  */
  return {
      get: get,
      checkData: checkData
  };

})();
