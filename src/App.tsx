import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.module.scss';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
// import UserProfile from './components/UserProfile/UserProfile';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/Register/RegisterPage';
import BookSearch from './pages/BookSearch/BookSearch';
import { Chat } from './components/Chat/Chat';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<BookSearch />} />
          {/* <Route path="/profile" element={<UserProfile />} /> */}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
