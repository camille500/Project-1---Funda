/*
TODO: - Show street and cityname
      - Create filters and sort options
      - Detailview for every house
      - Suggestions
      - Styling
      - Modular?
*/
{
  'use strict';

  const app = {
    init() {
      locationData.getUserLocation();
    },
    get(url) {
      request.open('GET', url, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          const data = JSON.parse(request.responseText);
          if (data.results) {
            houseData.buildUrl(data.results[0].address_components);
          } else if (data.Objects) {
            houseData.clean(data);
          } else {
            houseDetail.clean(data);
          }
        } else {
          console.log('error');
        }
      };
      request.onerror = function() {
        console.log('error');
      };
      request.send();
    },
  };

  /* GETTING THE USERS LOCATION
  ------------------------------------------------  */
  const locationData = {
    getUserLocation() {
      if (navigator.geolocation.getCurrentPosition) {
        navigator.geolocation.getCurrentPosition(location => {
          locationData.buildUrl(location.coords.latitude, location.coords.longitude)
        });
      }
    },
    buildUrl(lat, long) {
      app.get(`${googleBaseUrl}latlng=${lat},${long}${googleApiKey}`);
    }
  };

  /* METHODS FOR THE HOUSE DATA (LISTS)
  ------------------------------------------------  */
  const houseData = {
    buildUrl(location) {
      const locationString = `/${location[4].long_name.toLowerCase()}/${location[1].long_name.toLowerCase()}/+1km/`;
      app.get(`${fundaBaseUrl}type=koop&zo=${locationString}&page=1&pagesize=25`);
    },
    clean(data) {
      data.Objects.map(function(house) {

      });
      this.setAttributes(data);
    },
    setAttributes(data) {
      let attributes = {
        house_id: {
          href: function() {
            return `#detail/${this.Id}`;
          }
        },
        list_image: {
          src: function() {
            console.log(this);
            return `${this.FotoLarge}`;
          }
        }
      }
      this.render(data, attributes)
    },
    filter(data) {

    },
    render(data, attributes) {
      Transparency.render(elements.listSection, data.Objects, attributes);
    }
  };

  /* METHODS FOR THE HOUSE DETAIL PAGES
  ------------------------------------------------  */
  const houseDetail = {
    buildUrl(id) {
      app.get(`http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/${fundaApiKey}/koop/${id}/`)
    },
    clean(data) {
      console.log(data);
    }
  }

  /* EVENT HANDLERS
  ------------------------------------------------  */
  const events = {
    init() {

    }
  };

  /* ROUTIE FOR ROUTE HANDELING
  ------------------------------------------------  */
  routie({
    '': () => {

    },
    'detail/:id': (id) => {
      houseDetail.buildUrl(id);
    }
  });

  app.init();

}
