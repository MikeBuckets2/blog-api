import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Nav() {
  const { username, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        blog / admin
      </Link>
      {isLoggedIn && (
        <div className="nav-right">
          <span className="nav-user">{username}</span>
          <button onClick={handleLogout} className="nav-logout">
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
}