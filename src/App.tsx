// import './assets/css/theme-rtl.min.css';
import { Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './assets/css/theme.min.css';
import "react-toastify/dist/ReactToastify.css";
import './assets/css/user.css';
import Loader from './components/loader';
import { IRoute } from './types/routes';
import { LayoutContext } from './contexts/layout-context';
import { ToastContainer } from 'react-toastify';
import { useScreenLoader } from './hooks/useScreenLoader';
import { withProfiler } from '@sentry/react';
import { useRoutes } from './hooks/useRoutes';

const renderRoutes = (routes: IRoute[]) => {
  console.log(routes)
  return routes.map(route => {
    console.log(route.hasPermission)
    if(!route.hasPermission) return <Route key='has-no-permission' path='*' />
    if(route.childRoutes) {
      return <Route key={route.id} path={route.path} element={route.element}>
                {renderRoutes(route.childRoutes)}
              </Route>
    }
    return <Route key={route.id} index={route.isIndex} path={route.path} element={route.element} />
  })
}

function App() {

  const { isScreenLoading } = useScreenLoader();
  const {appRoutes} = useRoutes();

  return (
    <div className="App position-relative">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            {renderRoutes(appRoutes)}
          </Routes>
        </Suspense>
      </BrowserRouter>
      {isScreenLoading && <Loader />}
      <ToastContainer />
    </div>
  )
}

export default withProfiler(App)
