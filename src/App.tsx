// import './assets/css/theme-rtl.min.css';
import { Suspense, useContext } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './assets/css/theme.min.css';
import "react-toastify/dist/ReactToastify.css";
import './assets/css/user.css';
import Loader from './components/loader';
import { routes } from './routes';
import { IRoute } from './types/routes';
import { LayoutContext } from './contexts/layout-context';
import { ToastContainer } from 'react-toastify';
import { useScreenLoader } from './hooks/useScreenLoader';

const renderRoutes = (routes: IRoute[]) => {
  return routes.map(route => {
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

  return (
    <div className="App position-relative">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            {renderRoutes(routes)}
          </Routes>
        </Suspense>
      </BrowserRouter>
      {isScreenLoading && <Loader />}
      <ToastContainer />
    </div>
  )
}

export default App
