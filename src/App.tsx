import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.module.scss';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/Register/RegisterPage';
import BookSearch from './pages/BookSearch/BookSearch';
import UserProfile from './pages/UserProfile/UserProfile';
import { Chat } from './components/1_BigComponents/Chat/Chat';
import { ExchangeProposalPage } from './pages/ObminPage/ExchangeProposalPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<BookSearch />} />
          <Route path="/obmin" element={<ExchangeProposalPage />} />

          <Route path="/profile" element={<UserProfile />}>
            <Route path="my" element={<div>Мої книги</div>} />
            <Route path="saved" element={<div>Збережені книги</div>} />
            <Route path="requests" element={<div>Всі запити</div>} />
          </Route>

          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
