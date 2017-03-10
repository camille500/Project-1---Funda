const Routes = (function() {
  'use strict';

  /* ROUTIE FOR ROUTE HANDLING
  ------------------------------------------------  */
  const init = () => {
    routie({
      '': () => {
        localStorage.removeItem('locationResult');
        Sections.toggleSections(elements.filterSection);
      },
      'saveFilters': () => {
        elements.filters.forEach(function(filter, i) {
          localStorage.removeItem(`filter${i+1}`);
          localStorage.setItem(`filter${i+1}`, filter.options[filter.selectedIndex].value); // Get selected option in select box
        });
        window.location.hash = 'nieuwe-locatie/1';
      },
      'nieuwe-locatie/:page': (page) => {
        localStorage.setItem('page', page);
        UserLocation.init()
        window.location.hash = 'overzicht';
      },
      'overzicht': () => {
        Sections.toggleSections(elements.listSection);
        elements.sortOptions.classList.remove('hidden');
        elements.meerResultaten.classList.remove('hidden');
        if(localStorage.getItem('locationResult')) {
          Funda.setListAttributes(JSON.parse(localStorage.getItem('locationResult')));
        } else {
          UserLocation.init();
        }
      },
      'overzicht-old': () => {
        Sections.toggleSections(elements.listSection);
        elements.sortOptions.classList.remove('hidden');
        elements.meerResultaten.classList.remove('hidden');
        Funda.makeListUrl('');
      },
      'overzicht/aflopend': () => {
        Funda.sortList(JSON.parse(localStorage.getItem('locationResult')), '');
      },
      'overzicht/oplopend': () => {
        Funda.sortList(JSON.parse(localStorage.getItem('locationResult')), -1);
      },
      'aanbevelingen': () => {
        Sections.toggleSections(elements.aanbevelingSection);
        elements.sortOptions.classList.add('hidden');
        elements.meerResultaten.classList.remove('hidden');
        Funda.makeListUrl(`/${localStorage.getItem('average_price')}+/${localStorage.getItem('oppervlakte')}+woonopp`);
      },
      'detail/:id': (id) => {
        Funda.makeDetailUrl(id);
        Sections.toggleSections(elements.detailSection);
      }
    });
  };

  /* MAKES SURE THAT THE RETURNED FUNCTIONS CAN BE USED
  ------------------------------------------------  */
  return {
      init: init,
  };

})();
