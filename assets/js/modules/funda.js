const Funda = (function() {
  'use strict';

  /* BUILD THE URL FOR THE API REQUEST TO FUNDA (LIST)
  ------------------------------------------------  */
  const makeListUrl = (extraFilters) => {
    let city = localStorage.getItem('city'); // Get the user location (city & street)
    let street = localStorage.getItem('street');
    let distance = localStorage.getItem('filter4');
    let page = localStorage.getItem('page');
    const locationString = `/${city}/${street}/${distance}${extraFilters}/`;
    console.log(locationString)
    Requests.get(`${config.fundaListBaseUrl}type=koop&zo=${locationString}&page=${page}&pagesize=24`, 'list');
  };

  /* BUILD THE URL FOR THE API REQUEST TO FUNDA (DETAIL)
  ------------------------------------------------  */
  const makeDetailUrl = (id) => {
    Requests.get(`${config.fundaDetailBaseUrl}koop/${id}`, 'detail');
  };

  /* CLEAN THE LIST DATA
  ------------------------------------------------  */
  const cleanList = (listData) => {
    listData.AveragePrice = 0;
    listData.AverageOppervlak = 0;
    listData.Objects.map(function(object) {
      object.KoopprijsString = Utils.formatCurrency(object.Koopprijs, ` ${object.Prijs.KoopAbbreviation}`);
      object.KoopprijsTotString = Utils.formatCurrency(object.KoopprijsTot, ` ${object.Prijs.KoopAbbreviation}`);
      object.PublicatieDatumString = Utils.formatDate(object.PublicatieDatum, 'string');
      object.PublicatieDatum = Utils.formatDate(object.PublicatieDatum, 'date');
      listData.AveragePrice = listData.AveragePrice + Number(object.Koopprijs);
      listData.AverageOppervlak = listData.AverageOppervlak + Number(object.Woonoppervlakte);
    });
    localStorage.setItem('average_price', Math.round(listData.AveragePrice / listData.Objects.length))
    localStorage.setItem('oppervlakte', Math.round(listData.AverageOppervlak / listData.Objects.length))
    sortList(listData);
  };

  /* SORT THE LIST DATA, BASED ON THE USERS INPUT
  ------------------------------------------------  */
  const sortList = (listData, type = '') => {
    listData.Objects = listData.Objects.sort(
      firstBy(localStorage.getItem('filter1'), type)
      .thenBy(localStorage.getItem('filter2'), type)
      .thenBy(localStorage.getItem('filter3'), type)
    );
    localStorage.setItem('locationResult', JSON.stringify(listData));
    setListAttributes(listData);
  }

  /* CLEAN THE DETAIL DATA
  ------------------------------------------------  */
  const cleanDetail = (detailData) => {
    detailData.AangebodenSinds = Utils.formatDate(detailData.AangebodenSinds, 'string');
    detailData.GewijzigdDatum = Utils.formatDate(detailData.GewijzigdDatum, 'string');
    detailData.KoopPrijs = Utils.formatCurrency(detailData.Koopprijs, ',-');
    detailData.PublicatieDatum = Utils.formatDate(detailData.PublicatieDatum, 'string');
    for (let key in detailData) {
      if (detailData[key] === null) {
        detailData[key] = 'Onbekend';
      } else if (detailData[key] === false) {
        detailData[key] = 'Nee';
      } else if (detailData[key] === true) {
        detailData[key] = 'Ja';
      }
    }

    setDetailAttributes(detailData);
  };

  /* SET ALL LIST ATTRIBUTES SO THAT TRANSPARENCY CAN RENDER THEM
  ------------------------------------------------  */
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

  /* SET ALL DETAIL ATTRIBUTES SO THAT TRANSPARENCY CAN RENDER THEM
  ------------------------------------------------  */
  const setDetailAttributes = (cleanDetailData) => {
    let attributes = {};
    const getAllImages = function() {
      cleanDetailData.Media.map(function(item, i) {
        if (item.MediaItems[2]) {
          setImageAttribute(item.MediaItems[2].Url, i);
        }
      });
    };
    const setImageAttribute = (item, index) => {
      attributes[`photo${index}`] = {
        src: function() {
          return item
        }
      };
    };
    getAllImages();
    Sections.renderDetail(cleanDetailData, attributes)
  };

  /* MAKES SURE THAT THE RETURNED FUNCTIONS CAN BE USED
  ------------------------------------------------  */
  return {
    makeListUrl: makeListUrl,
    makeDetailUrl: makeDetailUrl,
    cleanList: cleanList,
    sortList: sortList,
    cleanDetail: cleanDetail,
    setListAttributes: setListAttributes,
    setDetailAttributes: setDetailAttributes
  };

})();
