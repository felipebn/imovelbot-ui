import React, { Component } from 'react';
import './App.css';
import Progress from 'react-progress';
import Listing from './components/Listing.js';
import RealEstateCard from './components/RealEstateCard';
import RealEstatePanel from './components/RealEstatePanel';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchRealEstateListing } from './store';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Progress percent={this.props.loadingProgress} height="4"/>
        <Switch>
          <Route exact path='/' render={(props) => this.renderWithTitle("Property Listing", <Listing posts={this.props.posts}/>)}/>
          <Route path='/realEstate/:id' render={(props) => this.renderWithTitle("",<RealEstatePanel postId={props.match.params.id}/>)}/>
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchListing();
  }

  renderWithTitle(title, component){
    document.title = title;
    return component;
  }
}

const mapStateToProps = (state) => {
  console.log("Mapping state to props", state)
  return {
    loadingProgress: state.loadingProgress,
    posts: state.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListing: () => dispatch(fetchRealEstateListing())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
