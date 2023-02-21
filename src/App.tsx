// import './assets/css/theme-rtl.min.css';
import { Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './assets/css/theme.min.css';
import './assets/css/user.css';
import Loader from './components/loader';
import ProtectedRoute from './components/protected-route';
import SignIn from './pages/auth/sign-in';
import Main from './pages/main';
import RolesPage from './pages/roles';
import UsersPage from './pages/users';
import { routes } from './routes';
import { IRoute } from './types/routes';

const renderRoutes = (routes: IRoute[]) => {
  return routes.map(route => {
    if(route.childRoutes) {
      return <Route key={route.id} path={route.path} element={route.element}>
                {renderRoutes(route.childRoutes)}
              </Route>
    }
    return <Route index={route.isIndex} path={route.path} element={route.element} />
  })
}

function App() {

  return (
    <div className="App position-relative">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            {renderRoutes(routes)}
              {/* <Route path='/' element={<ProtectedRoute>
                                          <Main />
                                        </ProtectedRoute>}>
                <Route index path='/' element={<div>Dashboard</div>} />
                <Route path='/users' element={<UsersPage />} />
                <Route path='/roles' element={<RolesPage />} />
              </Route>
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='*' element={<SignIn />} /> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
