import React, { Component } from 'react';
import RealStateCard from './RealStateCard.js';
//import './Listing.css';

class Listing extends Component {
  render() {
    var columns = this.props.posts.map(post => this.renderColumn(post))
    return (
      <div className="columns is-multiline">
        {columns}
      </div>
    );
  }

  renderColumn(post){
    return (<div className="column is-one-quarter-desktop is-half-tablet">
      <RealStateCard 
        title={post.title}
        price={post.price}
        description={post.description}
        mainPhotoUrl={post.mainPhotoUrl}
        lastUpdated={post.lastUpdate}/>
    </div>);
  }
}

export default Listing;
