import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface PreviousPath {
  prevPath?: string
}

const Nav: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  const location = useLocation<PreviousPath>()

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen)
  }

  useEffect(() => {
    if (location.pathname !== location?.state?.prevPath) {
      setNavbarOpen(false)
    }
  }, [location.pathname, location?.state?.prevPath])

  return (
    <nav
      className="navbar is-black"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link
          className="navbar-item"
          to={{ pathname: '/', state: { prevPath: location.pathname } }}
        >
          <p>Movie List</p>
        </Link>
        <button
          className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`}
          onClick={() => toggleNavbar}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <Link
            className="navbar-item"
            to={{ pathname: '/', state: { prevPath: location.pathname } }}
          >
            Home
          </Link>
          <Link
            className="navbar-item"
            to={{
              pathname: '/cinemas',
              state: { prevPath: location.pathname },
            }}
          >
            Cinemas Near Me
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav
