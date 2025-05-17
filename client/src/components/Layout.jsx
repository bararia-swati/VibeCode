import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="container">
          <Link to="/" className="logo">
            NoteApp
          </Link>
          <nav>
            <ul>
              <li>
                <Link to="/">Notes</Link>
              </li>
              <li>
                <Link to="/notes/new">Create Note</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Note Taking App</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 