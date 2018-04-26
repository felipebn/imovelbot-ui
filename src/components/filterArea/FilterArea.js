import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startSearch } from '../../state/store';
import LocationDropdown from './LocationDropdown'
import './FilterArea.css';

class FilterArea extends Component {
  constructor(props){
    super(props)
    this.state = {
      "businessType": "BUY",
      "location": null,
      "propertyType": "House",
      "priceRange":{min: null, max: null},
      "areaRange":{min: null, max: null} ,
      "bedroomRange":{min: null, max: null}   
    }
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)
    this.handleInputChangeEvent = this.handleInputChangeEvent.bind(this)
  }

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
          <select onInput={this.handleInputChangeEvent} name="businessType">
            <option value="BUY">To buy</option>
            <option value="RENT">To rent</option>
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
          <select onInput={this.handleInputChangeEvent} name="location">
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
        <input className="input" type="text" placeholder="Min" onInput={this.handleInputChangeEvent} name="priceRange" propertyname="min"/>
        <span className="icon is-small is-left">
          <i className="fa fa-eur"></i>
        </span>
      </div>
      <div className="control has-icons-left">
        <input className="input" type="text" placeholder="Max" onInput={this.handleInputChangeEvent} name="priceRange" propertyname="max"/>
        <span className="icon is-small is-left">
          <i className="fa fa-eur"></i>
        </span>
      </div>
    </div>)
  }

  renderAreaRangeFilter(){
    return(<div className="field has-addons compactFilter">
      <div className="control has-icons-left">
        <input className="input" type="text" placeholder="Min" onInput={this.handleInputChangeEvent} name="areaRange" propertyname="min"/>
        <span className="icon is-small is-left">
          <i className="fa fa-arrows"></i>
        </span>
      </div>
      <div className="control has-icons-left">
        <input className="input" type="text" placeholder="Max" onInput={this.handleInputChangeEvent} name="areaRange" propertyname="max"/>
        <span className="icon is-small is-left">
          <i className="fa fa-arrows"></i>
        </span>
      </div>
    </div>)
  }

  renderRoomRangeFilter(){
    return(<div className="field has-addons compactFilter">
      <div className="control has-icons-left">
        <input className="input" type="text" placeholder="Min" onInput={this.handleInputChangeEvent} name="bedroomRange" propertyname="min"/>
        <span className="icon is-small is-left">
          <i className="fa fa-bed"></i>
        </span>
      </div>
      <div className="control has-icons-left">
        <input className="input" type="text" placeholder="Max" onInput={this.handleInputChangeEvent} name="bedroomRange" propertyname="max"/>
        <span className="icon is-small is-left">
          <i className="fa fa-bed"></i>
        </span>
      </div>
    </div>)
  }

  renderSearchButton(){
    return(<div className="field searchButton">      
      <a className="button" onClick={this.handleSearchButtonClick}>
        <span className="icon">
          <i className="fa fa-search"></i>
        </span>
        <span>Search</span>
      </a>
    </div>)
  }

  handleSearchButtonClick(){
    this.props.startSearch()
  }

  handleInputChangeEvent(e){
    //TODO add event handler to input fields, 
    var inputName = e.currentTarget.name
    var filterPropName = e.currentTarget.getAttribute("propertyname")
    console.log("Input changed", inputName, filterPropName, e.currentTarget.value)
    var stateUpdate = {}
    if(filterPropName){
      stateUpdate[inputName] = {}
      stateUpdate[inputName][filterPropName] = e.currentTarget.value
    }else{
      stateUpdate[inputName] = e.currentTarget.value
    }
    this.setState(stateUpdate)
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startSearch: (filters) => dispatch(startSearch(filters)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterArea)