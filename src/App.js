import React, { Component } from 'react';
import './App.css';
import Progress from 'react-progress';
import Navbar from './components/base/Navbar';
import Listing from './components/Listing';
import RealEstatePanel from './components/RealEstatePanel';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Progress percent={this.props.loadingProgress} height="4"/>
        <Switch>
          <Route exact path='/' render={(props) => this.renderWithTitle("Property Listing", <Listing/>)}/>
          <Route path='/realEstate/:id' render={(props) => this.renderWithTitle("",<RealEstatePanel postId={props.match.params.id}/>)}/>
        </Switch>
      </div>
    );
  }

  renderWithTitle(title, component){
    document.title = title;
    return component;
  }
}

const mapStateToProps = (state) => {
  console.log("Mapping state to App.props", state)
  return {
    loadingProgress: state.loadingProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
