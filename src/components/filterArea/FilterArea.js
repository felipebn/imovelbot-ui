import React, { Component } from 'react';
import './FilterArea.css';

class FilterArea extends Component {
  render(){
    return (
      <nav className="navbar filterArea has-shadow" role="navigation" aria-label="main navigation">
        {this.renderFields()}
      </nav>
    )
  }

  renderFields(){
    return (
      <div className="navbar-item">
        <div className="field is-grouped">
          <p className="control">
            <a className="button">
              <span className="icon">
                <i className="fas fa-twitter" aria-hidden="true"></i>
              </span>
              <span>Tweet</span>
            </a>
          </p>
          <p className="control">
            <a className="button is-primary">
              <span className="icon">
                <i className="fas fa-download" aria-hidden="true"></i>
              </span>
              <span>Download</span>
            </a>
          </p>
        </div>
      </div>
    )
  }
}

export default FilterArea;