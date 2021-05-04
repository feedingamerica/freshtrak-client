import React from 'react';
// import '../../Assets/scss/main.scss';
import { RENDER_URL } from '../../Utils/Urls';
import { useLocation, matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectZip } from '../../Store/Search/searchSlice';
import localization from '../Localization/LocalizationComponent'

const HeaderDataComponent = () => { console.log('basil tj');
  const location = useLocation();
  const zip = useSelector(selectZip);
  const getPath = pathname => {
    const matchEvent = matchPath(pathname, {
      path: RENDER_URL.EVENT_LIST_URL,
      exact: false,
    });
    return (matchEvent && matchEvent.path) || '';
  };
  const currentPath = getPath(location.pathname);

  return (
    <div className="container h-100">
      <div className="header-content h-100 d-flex flex-column align-items-center justify-content-center">
        <div className="banner-content">
          {currentPath !== RENDER_URL.EVENT_LIST_URL ? (
            <h1 className="text-center">
              {localization.home_freshtrack}
            </h1>
          ) : (
            <h1 className="text-center">{localization.resource_zip_code} {zip}</h1>
          )}
          {currentPath !== RENDER_URL.EVENT_LIST_URL && (
            <p className="text-center" data-testid="subtext-on-header">
              {localization.home_header_component}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default HeaderDataComponent;
