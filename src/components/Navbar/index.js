import './index.css'

import {withRouter, Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="nav-styling">
      <h1>movieDB</h1>
      <ul className="unordered-list-styling">
        <Link to="/" className="link-styling">
          <li>Popular</li>
        </Link>
        <Link to="/top-rated" className="link-styling">
          <li>Top Rated</li>
        </Link>
        <Link to="/upcoming" className="link-styling">
          <li>Upcoming</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Navbar
