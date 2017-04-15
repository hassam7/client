import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
class Header extends Component {
  renderLogIn() {
    return (

      <nav className="navbar navbar-light">
        <Link className="navbar-brand" to="/">Redux Auth</Link>

        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/signin"> Sign In </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup"> Sign Up </Link>
          </li>
        </ul>
      </nav>
    );
  }
  renderLogOut() {
    return (

      <nav className="navbar navbar-light">
        <Link className="navbar-brand" to="/">Redux Auth</Link>

        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/signout"> Sign Out </Link>
          </li>
        </ul>
      </nav>
    );
  }
  render() {
    console.log(this.props.authenticated)
    if (this.props.authenticated) {
      return this.renderLogOut();
    } else {
      return this.renderLogIn();
    }
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}
export default connect(mapStateToProps)(Header);
