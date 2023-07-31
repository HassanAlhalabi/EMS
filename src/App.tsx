import { Suspense } from 'react';

import { Route, BrowserRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import SlideRoutes from 'react-slide-routes';

import { useScreenLoader } from './hooks/useScreenLoader';
import { useRoutes } from './hooks/useRoutes';
import Loader from './components/loader';
if(localStorage.getItem('i18nextLng') === 'ar') {
  import('./assets/css/theme-rtl.min.css');
  import('./assets/css/user-rtl.css');
} else {
  import('./assets/css/theme.min.css');
  import('./assets/css/user.css');
}
import './assets/css/global.css';
import { IRoute } from './types';
import useLoadingBar from './hooks/useLoadingBar';

const renderRoutes = (routes: IRoute[]) => {
  return routes.map(route => {
    if(!route.hasPermission) return <Route key='has-no-permission' path='*' />
    if(route.childRoutes) {
      return <Route key={route.id} path={route.path} element={route.element} >
                {renderRoutes(route.childRoutes)}
              </Route>
    }
    return <Route key={route.id} index={route.isIndex} path={route.path} element={route.element} />
  })
}

function App() {

  const { isScreenLoading } = useScreenLoader();
  const { renderLoadingBar } = useLoadingBar();
  const { appRoutes } = useRoutes();

  return (
    <div className="App position-relative">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <SlideRoutes>
            {renderRoutes(appRoutes)}
          </SlideRoutes>
        </Suspense>
      </BrowserRouter>
      {isScreenLoading && <Loader />}
      { renderLoadingBar() }
      <ToastContainer />
    </div>
  )
}

export default App
