import { useState } from 'react';
import NavBar from './components/NavBar';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from 'react-router-dom';
import Recherche from './pages/Recherche';
import Organiser from './pages/Organiser';
import LandingPage from './pages/LandingPage';
import Inscription from './pages/Inscription';
import UserProfile from './pages/UserProfile';
import UserInterface from './pages/UserInterface';
import Admin from './pages/Admin';
import Connexion from './pages/Connexion';
import CurrentUserProvider, { useAuth } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';
import AdminBackLink from './components/AdminBackLink';
import ToastProvider from './context/ToastContext';
import EventsProvider from './context/EventsContext';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import FormulaireContact from './pages/FormulaireContact';
import BlogProvider from './context/BlogContext';
import BlogOrganiser from './pages/BlogOrganiser';
import Search from './pages/Recherche';
import SearchBlog from './pages/RechercheBlog';

export const NavLayout = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <>
      <NavBar />
      {currentUser?.role === 'admin' && location.pathname !== '/admin' && (
        <div className='d-flex justify-content-center'>
          <AdminBackLink />
        </div>
      )}
      <Outlet />
      {/* //une variable qui represente la page sur la quelle tu te retrouve  */}
    </>
  );
};
const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastProvider>
          <CurrentUserProvider>
            <EventsProvider>
              <BlogProvider>
                <Routes>
                  <Route index element={<LandingPage />} />
                  <Route path='/inscription' element={<Inscription />} />
                  <Route path='/connexion' element={<Connexion />} />
                  <Route
                    path='/password/recover'
                    element={<ForgotPassword />}
                  />
                  <Route path='/password/reset' element={<ResetPassword />} />
                  <Route
                    path='/formulairecontact'
                    element={<FormulaireContact />}
                  />{' '}
                  <Route element={<NavLayout />}>
                    {/* Admin Protected Routes */}
                    <Route element={<RequireAuth allowedRole={['admin']} />}>
                      <Route path='/admin' element={<Admin />} />
                    </Route>
                    {/* User Protected Routes */}
                    <Route
                      element={<RequireAuth allowedRole={['admin', 'user']} />}
                    >
                      <Route
                        path='/user/interface'
                        element={<UserInterface />}
                      />
                      <Route path='/user/profile' element={<UserProfile />} />
                      <Route path='/recherche' element={<Recherche />} />
                      <Route path='/organiser' element={<Organiser />} />
                      <Route
                        path='/organiserBlog'
                        element={<BlogOrganiser />}
                      />
                      <Route path='/rechercheBlog' element={<SearchBlog />} />
                    </Route>
                  </Route>
                </Routes>
              </BlogProvider>
            </EventsProvider>
          </CurrentUserProvider>
        </ToastProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
