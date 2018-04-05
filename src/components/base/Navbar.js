import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Navbar.css';

class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
      return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src="/img/logo.png" width="29" height="36" alt="Movingbot logo"/>
                    movingbot
                </a>

                <div className="navbar-burger is-active">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
      );
  }

}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
