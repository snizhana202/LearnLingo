import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Modal/Modal';
import LoginForm from '../AuthForm/LoginForm';
import RegisterForm from '../AuthForm/RegisterForm';
import './Header.scss';
import { FiLogIn } from "react-icons/fi";

export default function Header() {
  const { isLoggedIn, currentUser, logout } = useAuth();
  const [authMode, setAuthMode] = useState(null);
  const closeAuthModal = () => setAuthMode(null);

  return (
    <header className="header">
      <div className="container header__inner">
        <NavLink to="/" className="header__logo">
           <img src="/ukraine.svg" alt="LearnLingoLogo" />
           LearnLingo
        </NavLink>

        <nav className="header__nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Home
          </NavLink>
          <NavLink to="/teachers" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Teachers
          </NavLink>
        </nav>

        <div className="header__actions">
          {isLoggedIn ? (
            <>
              <span className="header__user">{currentUser.displayName || currentUser.email}</span>
              <button type="button" className="btn btn-outline" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <button type="button" className="header__login" onClick={() => setAuthMode('login')}>
                <FiLogIn className='header__loginLogo'/> 
                Log In
              </button>
              <button type="button" className="btn btn-dark" onClick={() => setAuthMode('register')}>
                Registration
              </button>
            </>
          )}
        </div>
      </div>

      <Modal isOpen={authMode !== null} onClose={closeAuthModal}>
        {authMode === 'login' ? (
          <LoginForm onSuccess={closeAuthModal} onSwitchToRegister={() => setAuthMode('register')} />
        ) : (
          <RegisterForm onSuccess={closeAuthModal} onSwitchToLogin={() => setAuthMode('login')} />
        )}
      </Modal>
    </header>
  );
}