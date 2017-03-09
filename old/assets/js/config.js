const request = new XMLHttpRequest();
const fundaApiKey = '271175433a7c4fe2a45750d385dd9bfd';
const fundaBaseUrl = `http://funda.kyrandia.nl/feeds/Aanbod.svc/json/${fundaApiKey}/?`;
const googleApiKey = '&key=AIzaSyC_MvSpOU_4XLoneCkdMy_CG1eg8lK7UIA';
const googleBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';

const elements = {
  allSections: document.querySelectorAll('section'),
  listSection: document.querySelector('.listSection'),
  detailSection: document.querySelector('.detailSection'),
  locationTitle: document.querySelector('.locationTitle')
};
