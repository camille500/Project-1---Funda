const Sections = (function() {
  'use strict';

  /* FUNCTIONALITY FOR RENDERING LISTS WITH DATA
  ------------------------------------------------  */
  const renderList = (listData, attributes) => {
    Transparency.render(elements.listSection, listData.Objects, attributes);
  }

  /* FUNCTIONALITY FOR RENDERING DETAIL WITH DATA
  ------------------------------------------------  */
  const renderDetail = () => {

  }

  return {
      renderList: renderList,
      renderDetail: renderDetail
  };

})();
