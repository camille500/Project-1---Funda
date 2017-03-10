const Sections = (function() {
  'use strict';

  const toggleSections = (section) => {
    elements.allSections.forEach(function(el) {
      el.classList.add('hidden');
    });
    section.classList.remove('hidden');
  };

  /* FUNCTIONALITY FOR RENDERING LISTS WITH DATA
  ------------------------------------------------  */
  const renderList = (listData, attributes) => {
    Transparency.render(elements.listSection, listData.Objects, attributes);
    Transparency.render(elements.sortOptions, listData);
    elements.loader.classList.add('hidden');
  };

  /* FUNCTIONALITY FOR RENDERING DETAIL WITH DATA
  ------------------------------------------------  */
  const renderDetail = (detailData, attributes) => {
    Transparency.render(elements.detailSection, detailData, attributes);
    elements.loader.classList.add('hidden');
  };

  /* MAKES SURE THAT THE RETURNED FUNCTIONS CAN BE USED
  ------------------------------------------------  */
  return {
      toggleSections: toggleSections,
      renderList: renderList,
      renderDetail: renderDetail
  };

})();
