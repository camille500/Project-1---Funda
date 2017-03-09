const Render = (function() {
  'use strict';

  /* FUNCTIONALITY FOR RENDERING LISTS WITH DATA
  ------------------------------------------------  */
  const list = (listData) => {
    Transparency.render(elements.listSection, listData.Objects);
  }

  /* FUNCTIONALITY FOR RENDERING DETAIL WITH DATA
  ------------------------------------------------  */
  const detail = () => {

  }

  return {
      list: list,
      detail: detail
  };

})();
