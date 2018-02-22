import React, { Component } from 'react';
import './App.css';
import Progress from 'react-progress';
import Listing from './components/Listing.js';
import ListingApi from './services/ListingApi.js';
import RealEstateCard from './components/RealEstateCard';
import RealEstatePanel from './components/RealEstatePanel';
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props)
    this.state =  {
      posts: [],
      loadingProgress: 50
    }
  }
  render() {
    return (
      <div className="App">
        <Progress percent={this.state.loadingProgress} height="4"/>
        <Switch>
          <Route exact path='/' render={(props) => <Listing posts={this.state.posts}/>}/>
          <Route path='/realEstate/:id' render={(props) => <RealEstatePanel postId={props.match.params.id}/>}/>
        </Switch>
        
      </div>
    );
  }

  componentDidMount() {
    new ListingApi()
      .fetchPosts()
      .then(result => {
        console.log("loaded", result.realEstateProperties) 
        this.setState({posts: result.realEstateProperties, loadingProgress: 100})
      })
  }
}

export default App;
