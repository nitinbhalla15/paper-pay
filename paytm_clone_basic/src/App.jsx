import './App.css'
import TransferMoney from './custom-components/TransferMoney'
import DashboardPage from './custom-pages/DashboardPage'
import SignInPage from './custom-pages/SignInPage'
import SignUpPage from './custom-pages/SignUpPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './utils/ProtectedRoutes'
import RouteNotFound from './custom-pages/RouteNotFound'
import LandingPage from './custom-pages/LandingPage'
import AlertComponent from './custom-components/AlertComponent'

function App() {
  return (
    <AlertComponent>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes></ProtectedRoutes>}>
            <Route path='/dashboard' element={<DashboardPage></DashboardPage>}></Route>
            <Route path='/transferMoney' element={<TransferMoney></TransferMoney>} ></Route>
          </Route>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path='/sign-up' element={<SignUpPage></SignUpPage>}></Route>
          <Route path='/sign-in' element={<SignInPage></SignInPage>}></Route>
          <Route path="*" element={<RouteNotFound></RouteNotFound>}></Route>
        </Routes>
      </BrowserRouter>
    </AlertComponent>
  )
}

export default App