import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.module.scss';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import { AuthProvider } from './context/AuthContext';
import UserProfile from './pages/UserProfile/UserProfile';
import { ExchangeProposalPage } from './pages/ObminPage/ExchangeProposalPage';
import BookSearchPage from './pages/BookSearchPage/BookSearchPage';
import { ChatPage } from './pages/ChatPage/ChatPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<BookSearchPage />} />
          <Route path="/obmin" element={<ExchangeProposalPage />} />

          <Route path="/profile" element={<UserProfile />}>
            <Route path="my" element={<div>Мої книги</div>} />
            <Route path="saved" element={<div>Збережені книги</div>} />
            <Route path="requests" element={<div>Всі запити</div>} />
          </Route>

          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
