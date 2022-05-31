import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>FitPlan</h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
            <Link to="/profile">My Account</Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
            </>) : (
              <><a href="/login">Login</a><br></br><a href="/signup">Signup</a></>
            )
          }          
        </nav>
      </div>
    </header>
  );
};

export default Header;