import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.module.scss';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import UserProfile from './pages/UserProfile/UserProfile';
import { ExchangeProposalPage } from './pages/ObminPage/ExchangeProposalPage';
import BookSearchPage from './pages/BookSearchPage/BookSearchPage';
import { ChatPage } from './pages/ChatPage/ChatPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import PersonalInfo from './pages/PersonalInfo/PersonalInfo';

import { useAppDispatch } from './reduxHooks/useAppDispatch';
import { useEffect } from 'react';
import { checkAuth } from './features/authSlice/authSlice';

import PublicRoute from './components/routes/PublicRoute';
import ProtectedRoute from './components/routes/ProtectedRoute';
import { Support } from './pages/Support/Support';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LogoutOverlay } from './pages/LogoutOverlay/LogoutOverlay';
import OAuth2RedirectHandler from './components/modals/OAuth2RedirectHandler/OAuth2RedirectHandler';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
      <LogoutOverlay />
      <Routes>
        {/* Публічні маршрути */}
        <Route path="/" element={<HomePage />} />
        <Route path="/support" element={<Support />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Загальні маршрути */}
        <Route path="/login" element={<OAuth2RedirectHandler />} />
        <Route path="/search" element={<BookSearchPage />} />
        <Route path="/chat" element={<ChatPage />} />

        {/* Захищені маршрути */}
        <Route element={<ProtectedRoute />}>
          <Route path="/obmin" element={<ExchangeProposalPage />} />
          <Route path="/personal" element={<PersonalInfo />} />
          <Route path="/messages" element={<ChatPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
