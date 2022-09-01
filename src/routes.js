import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Charges from './pages/Charges';
import Clients from './pages/Clients';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ClientsDetail from './pages/ClientDetail';
import { getItem } from './utils/storage';
import { ContextProvider } from './context/Context';

const MainRoutes = () => {

    const ProtectedRoutes = ({ redirectTo }) => {
        const token = getItem('token');

        return token ? <Outlet /> : <Navigate to={redirectTo} />
    }
    return (
        <ContextProvider>
            <Routes>
                <Route path='/'>
                    <Route path='/' element={<SignIn />} />
                    <Route path='/sign-in' element={<SignIn />} />
                </Route>

                <Route path='/forgot-password' element={<ForgotPassword />} />

                <Route path='/sign-up' element={<SignUp />} />

                <Route element={<ProtectedRoutes redirectTo="/" />}>
                    <Route path='/home' element={<Home />} />
                    <Route path='/clients' element={<Clients />} />
                    <Route path='/charges' element={<Charges />} />
                    <Route path='/clients/detail/:id' element={<ClientsDetail />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>
        </ContextProvider>
    )
}

export default MainRoutes;