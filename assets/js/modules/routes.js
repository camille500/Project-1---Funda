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
        Sections.toggleSections(elements.listSection);
        if(localStorage.getItem('locationResult')) {
          Funda.setListAttributes(JSON.parse(localStorage.getItem('locationResult')));
        }
      },
      'detail/:id': (id) => {
        Sections.toggleSections(elements.detailSection);
      }
    });
  };

  return {
      init: init,
  };

})();
