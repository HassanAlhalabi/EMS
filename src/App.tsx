// import './assets/css/theme-rtl.min.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './assets/css/theme.min.css';
import './assets/css/user.css';
import ProtectedRoute from './components/protected-route';
import SignIn from './pages/auth/sign-in';
import Main from './pages/main';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<ProtectedRoute><Main /></ProtectedRoute>}>
              <Route index path='/' element={<div>dssadasdsad</div>} />
              <Route path='/test' element={<div>Test</div>} />
            </Route>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='*' element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
