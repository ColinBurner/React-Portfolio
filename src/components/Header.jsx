import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
      <header>
        <h1>Colin 'Burner' Taaffe</h1> 
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active' : '')}
                end
              >
                About Me
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portfolio"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resume"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Resume
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;