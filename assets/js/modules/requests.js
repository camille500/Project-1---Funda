const Requests = (function() {

  /* XMLHTTPREQUEST FOR GETTING THE DESIRED DATA
  ------------------------------------------------  */
  const get = (url, type) => {
    const request = config.request;
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText);
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
      Location.toString(data);
    } else if(type === 'list') {
      Funda.cleanList(data);
    }
  }

  return {
      get: get,
      checkData: checkData
  };

})();
