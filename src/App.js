import React, { Component } from 'react';
import './App.css';
import Progress from 'react-progress';
import Listing from './components/Listing.js';
import ListingApi from './services/ListingApi.js';


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
        <Listing posts={this.state.posts}/>
      </div>
    );
  }

  componentDidMount() {
    new ListingApi()
      .fetchPosts()
      .then(posts => this.setState({posts, loadingProgress: 100}))

  }
}

export default App;
