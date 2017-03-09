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
  };

  /* FUNCTIONALITY FOR RENDERING DETAIL WITH DATA
  ------------------------------------------------  */
  const renderDetail = () => {

  };

  return {
      toggleSections: toggleSections,
      renderList: renderList,
      renderDetail: renderDetail
  };

})();
