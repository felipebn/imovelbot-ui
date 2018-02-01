import React, { Component } from 'react';
import './App.css';
import Listing from './components/Listing.js';

class App extends Component {
  render() {
    var samplePost = {
      title:"T2 na Estrela com terraço e muita luz que nem precisa comprar lampadas para usar a noite",
      price:"900",
      description:"Property description limited to 250 characters so we can have an idea of what is written without including the full description. The 250 limit should be enougn to see some text here with lots of information.",
      mainPhotoUrl:"https://source.unsplash.com/1280x960/?real state,houses",
      lastUpdated:"11:09 PM - 1 Jan 2016"
    };

    var posts = [samplePost, samplePost, samplePost, samplePost, samplePost];
    return (
      <div className="App">
        <Listing posts={posts}/>
      </div>
    );
  }
}

export default App;
