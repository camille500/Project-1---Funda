const Funda = (function() {
  'use strict';

  /* BUILD THE URL FOR THE API REQUEST TO FUNDA
  ------------------------------------------------  */
  const makeUrl = () => {
    let city = localStorage.getItem('city');
    let street = localStorage.getItem('street');
    if(city && street) {
      const locationString = `/${city}/${street}/+1km/`;
      Requests.get(`${config.fundaBaseUrl}type=koop&zo=${locationString}&page=1&pagesize=25`, 'list');
    } else {
      Location.init();
    }
  }

  /* CLEAN THE LIST DATA
  ------------------------------------------------  */
  const cleanList = (listData) => {
    listData.Objects.map(function(object) {
      object.Koopprijs = Utils.formatCurrency(object.Koopprijs);
      object.KoopprijsTot = Utils.formatCurrency(object.KoopprijsTot);
      object.PublicatieDatumString = Utils.formatDate(object.PublicatieDatum, 'string');
      object.PublicatieDatum = Utils.formatDate(object.PublicatieDatum, 'date');
    });
    Render.list(listData);
  }

  return {
      makeUrl: makeUrl,
      cleanList: cleanList
  };

})();
