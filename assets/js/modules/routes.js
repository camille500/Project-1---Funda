const Routes = (function() {
  'use strict';

  /* ROUTIE FOR ROUTE HANDLING
  ------------------------------------------------  */
  const init = () => {
    routie({
      '': () => {
        localStorage.removeItem('locationResult');
        window.location.hash = 'nieuwe-locatie';
      },
      'nieuwe-locatie': () => {
        UserLocation.init()
        window.location.hash = 'overzicht';
      },
      'overzicht': () => {
        if(localStorage.getItem('locationResult')) {
          Funda.setListAttributes(JSON.parse(localStorage.getItem('locationResult')));
        } 
      },
      'detail/:id': (id) => {
        console.log(id);
      }
    });
  };

  return {
      init: init,
  };

})();
