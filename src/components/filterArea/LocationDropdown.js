import React, { Component } from 'react';
import './LocationDropdown.css';

class LocationDropdown extends Component {
  constructor(props){
    super(props);
    this.state = {
      district: null,
      city: null,
      parish: null,
      open: false
    }
    this.updateDistrict = this.updateDistrict.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateParish = this.updateParish.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  render(){
    //TODO build a places db or hardcode it
    var places = [
      {
        "name": "Lisbon",
        "cities":[
          {
            "name": "Lisbon",
            "parishes": [
              {"name":"Ajuda"},
              {"name":"Alcantara"},
              {"name":"Alvalade"},
              {"name":"Areeiro"}
            ]
          },
          {
            "name": "Cascais",
            "parishes": [
              {"name":"Alcabideche"},
              {"name":"Carcavelos e Parede"},
              {"name":"Cascais e Estoril"},
              {"name":"São Domingos de Rana"}
            ]
          }
        ]
      },
      {
        "name": "Porto",
        "cities":[
          {
            "name": "Porto",
            "parishes": [
              {"name":"Paranhos"},
              {"name":"Bonfim"},
              {"name":"Cedofeita"}
            ]
          }
        ]
      }
    ];

    const activeClass = this.state.open ? "is-active" : ""
    return (
      <div className={"dropdown locationDropdown " + activeClass}>
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.toggle}>
            <span>Location</span>
            <span className="icon is-small">
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {places.map(location => this.renderLocationOption(location, this.updateDistrict))}
          </div>
        </div>
        {this.renderCityDropdown()}
        {this.renderParishDropdown()}
      </div>
    )
  }

  toggle(){
    this.setState(oldState => {return {
      open: !oldState.open
    }})
  }

  updateDistrict(selectedDistrict){
    this.setState({
      district: selectedDistrict,
      city: null,
      parish: null
    })
  }

  updateCity(selectedDistrict){
    this.setState({
      city: selectedDistrict,
      parish: null
    })
  }

  updateParish(selectedDistrict){
    this.setState({
      parish: selectedDistrict,
      open: false
    })
  }

  renderCityDropdown(){
    if(this.state.district == null) return null;
    return (<div className="dropdown-menu" role="menu" style={{marginLeft:"192px"}}>
      <div className="dropdown-content">
        {this.state.district.cities.map(location => this.renderLocationOption(location, this.updateCity))}
      </div>  
    </div>)
  }

  renderParishDropdown(){
    if(this.state.city == null) return null;
    return (<div className="dropdown-menu" role="menu" style={{marginLeft:"384px"}}>
      <div className="dropdown-content">
        {this.state.city.parishes.map(location => this.renderLocationOption(location, this.updateParish))}
      </div>  
    </div>)
  }

  renderLocationOption(locationData, onSelectCallback){
    const withAngleIcon = (locationData.cities || locationData.parishes) != null;
    var angleIcon = withAngleIcon ? (
      <span className="icon is-small">
        <i className="fa fa-angle-right" aria-hidden="true"></i>
    </span>
    ) : null;
    const selectedClass = this.isDistrictOrCitySelected(locationData) ? "selected" : "";
    return (<a href="#" className={"dropdown-item " + selectedClass} onClick={() => onSelectCallback(locationData)}>
      {locationData.name} 
      {angleIcon}
    </a>)
  }

  isDistrictOrCitySelected(locationData){
    if(locationData.cities && this.state.district){
      return locationData.name == this.state.district.name
    }else if(locationData.parishes && this.state.city){
      return locationData.name == this.state.city.name
    }else{
      return false
    }
  }
}

export default LocationDropdown;