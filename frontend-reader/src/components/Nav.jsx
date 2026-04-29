import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        Blog
      </Link>
    </nav>
  );
}