import React, { Component } from 'react';
import './App.css';
import Progress from 'react-progress';
import Navbar from './components/base/Navbar';
import Listing from './components/Listing';
import RealEstatePanel from './components/RealEstatePanel';
import FilterArea from './components/filterArea/FilterArea';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
//          <!--Route path='/realEstate/:id' render={(props) => this.renderWithTitle(<RealEstatePanel postId={props.match.params.id}/>)}/ -->
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <FilterArea/>
        <Progress percent={this.props.loadingProgress} height="4"/>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Listing}/>
            <Route path='/realEstate/:id' component={RealEstatePanel}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  renderWithTitle(component){
    document.title = this.props.pageTitle;
    return component;
  }
}

const mapStateToProps = (state) => {
  console.log("Mapping state to App.props", state)
  return {
    loadingProgress: state.loadingProgress,
    pageTitle: state.pageTitle
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
