import React, { Component } from 'react';
import LocationDropdown from './LocationDropdown'
import './FilterArea.css';

class FilterArea extends Component {
  render(){
    return (
      <nav className="navbar filterArea has-shadow" aria-label="main navigation">
        {this.renderFields()}
      </nav>
    )
  }

  renderFields(){
    return (
      <div className="navbar-item">
        <div className="field is-horizontal" style={{justifyContent:"center"}}>
          {this.renderRentOrBuyFilter()}
          {this.renderLocationFilter()}
          {this.renderPropertyTypeFilter()}
          {this.renderPriceRangeFilter()}
          {this.renderAreaRangeFilter()}
          {this.renderRoomRangeFilter()}
          {this.renderSearchButton()}
        </div>
      </div>
    )
  }

  renderRentOrBuyFilter(){
    return(<div className="field">
      <div className="control">
        <div className="select">
          <select>
            <option>To buy</option>
            <option>To rent</option>
          </select>
        </div>
      </div>
    </div>)
  }

  renderPropertyTypeFilter(){
    //TODO should be multiselect and dynamic 
    return(<div className="field is-horizontal">
      <div className="control">
        <div className="select">
          <select>
            <option>House</option>
            <option>Detached House</option>
            <option>Apartment</option>
          </select>
        </div>
      </div>
    </div>)
  }

  renderLocationFilter(){
    return(<LocationDropdown />)
  }

  renderPriceRangeFilter(){
    return(<div className="field has-addons compactFilter">
      <div className="control has-icons-left">
        <input className="input" type="text" placeholder="Min"/>
        <span className="icon is-small is-left">
          <i className="fa fa-eur"></i>
        </span>
      </div>
      <div className="control has-icons-left">
        <input className="input" type="text" placeholder="Max"/>
        <span className="icon is-small is-left">
          <i className="fa fa-eur"></i>
        </span>
      </div>
    </div>)
  }

  renderAreaRangeFilter(){
    return(<div className="field has-addons compactFilter">
      <div className="control has-icons-left">
        <input className="input" type="text" placeholder="Min"/>
        <span className="icon is-small is-left">
          <i className="fa fa-arrows"></i>
        </span>
      </div>
      <div className="control has-icons-left">
        <input className="input" type="text" placeholder="Max"/>
        <span className="icon is-small is-left">
          <i className="fa fa-arrows"></i>
        </span>
      </div>
    </div>)
  }

  renderRoomRangeFilter(){
    return(<div className="field has-addons compactFilter">
      <div className="control has-icons-left">
        <input className="input" type="text" placeholder="Min"/>
        <span className="icon is-small is-left">
          <i className="fa fa-bed"></i>
        </span>
      </div>
      <div className="control has-icons-left">
        <input className="input" type="text" placeholder="Max"/>
        <span className="icon is-small is-left">
          <i className="fa fa-bed"></i>
        </span>
      </div>
    </div>)
  }

  renderSearchButton(){
    return(<div className="field searchButton">      
      <a class="button">
        <span class="icon">
          <i class="fa fa-search"></i>
        </span>
        <span>Search</span>
      </a>
    </div>)
  }

}

export default FilterArea;