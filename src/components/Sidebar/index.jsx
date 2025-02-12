import { Link, useLocation } from 'react-router-dom';
import './index.css';

function Sidebar() {
  const location = useLocation();

  return (
    <ul className="ul-sidebar mb-0 pt-3">
      <li>
        <Link className={location.pathname == '/' ? 'active' : null} to="/">
          Home
        </Link>
      </li>
      <li>
        <Link
          className={location.pathname == '/about-us' ? 'active' : null}
          to="/about-us"
        >
          About Us
        </Link>
      </li>
      <li>
        <Link
          className={location.pathname == '/teams' ? 'active' : null}
          to="/teams"
        >
          Teams
        </Link>
      </li>
      <li>
        <Link
          className={location.pathname == '/blogs' ? 'active' : null}
          to="/blogs"
        >
          Blogs
        </Link>
      </li>
      <li>
        <Link
          className={location.pathname == '/blog-categories' ? 'active' : null}
          to="/blog-categories"
        >
          Blog Categories
        </Link>
      </li>
      <li>
        <Link
          className={location.pathname == '/properties' ? 'active' : null}
          to="properties"
        >
          Properties
        </Link>
      </li>
      <li>
        <Link
          className={location.pathname == '/amenities' ? 'active' : null}
          to="/amenities"
        >
          Amenities
        </Link>
      </li>
      <li>
        <Link
          className={location.pathname == '/property-types' ? 'active' : null}
          to="/property-types"
        >
          Property Types
        </Link>
      </li>
      <li>
        <Link
          className={location.pathname == '/partners' ? 'active' : null}
          to="/partners"
        >
          Partners
        </Link>
      </li>
      <li>
        <Link
          className={location.pathname == '/departments' ? 'active' : null}
          to="/departments"
        >
          Departments
        </Link>
      </li>
      <li>
        <Link
          className={location.pathname == '/locations' ? 'active' : null}
          to="/locations"
        >
          Locations
        </Link>
      </li>
      <li>
        <Link
          className={location.pathname == '/languages' ? 'active' : null}
          to="/languages"
        >
          Languages
        </Link>
      </li>
      <li>
        <Link
          className={location.pathname == '/careers' ? 'active' : null}
          to="/careers"
        >
          Careers
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
