import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      navbarOpen: false
    }

    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render() {
    return(
      <nav className="navbar is-black" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <p>Movie List</p>
          </Link>
          <a className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link className="navbar-item" to="/">Home</Link>
            <Link className="navbar-item" to="/cinemas">Cinemas Near Me</Link>
          </div>
        </div>
      </nav>

    )
  }
}

export default withRouter(Nav)
