import {
  NavLink,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from 'react-router-dom';
import '../styles.css';

export default function Root() {
  const { state } = useNavigation();
  const isLoading = state === 'loading';

  return (
    <>
      <nav className="top-nav">
        <div className="nav-text-large">Nature's Northwest</div>
        <ul className="nav-list">
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? 'underline' : 'none',
                };
              }}
              to="/posts"
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? 'underline' : 'none',
                };
              }}
              to="/users"
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? 'underline' : 'none',
                };
              }}
              to="/todos"
            >
              Todos
            </NavLink>
          </li>
        </ul>
      </nav>
      <ScrollRestoration />

      {isLoading && <div className="loading-spinner" />}
      <div className={`container ${isLoading ? 'loading' : ''}`}>
        <Outlet />
      </div>
    </>
  );
}
