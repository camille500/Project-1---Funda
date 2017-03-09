const Funda = (function() {
  'use strict';

  /* BUILD THE URL FOR THE API REQUEST TO FUNDA
  ------------------------------------------------  */
  const makeUrl = () => {
    let city = localStorage.getItem('city');
    let street = localStorage.getItem('street');
    if (city && street) {
      const locationString = `/${city}/${street}/+1km/`;
      Requests.get(`${config.fundaBaseUrl}type=koop&zo=${locationString}&page=1&pagesize=25`, 'list');
    } else {
      UserLocation.init();
    }
  };

  /* CLEAN THE LIST DATA
  ------------------------------------------------  */
  const cleanList = (listData) => {
    listData.Objects.map(function(object) {
      object.Koopprijs = Utils.formatCurrency(object.Koopprijs);
      object.KoopprijsTot = Utils.formatCurrency(object.KoopprijsTot);
      object.PublicatieDatumString = Utils.formatDate(object.PublicatieDatum, 'string');
      object.PublicatieDatum = Utils.formatDate(object.PublicatieDatum, 'date');
    });
    localStorage.setItem('locationResult', JSON.stringify(listData));
    setListAttributes(listData);
  };

  const setListAttributes = (cleanListData) => {
    let attributes = {
      houseID: {
        href: function() {
          return `#detail/${this.Id}`;
        }
      },
      mainImage: {
        src: function() {
          return this.FotoLarge;
        }
      }
    }
    Sections.renderList(cleanListData, attributes)
  };

  return {
    makeUrl: makeUrl,
    cleanList: cleanList,
    setListAttributes: setListAttributes
  };

})();
