import React, { Component } from 'react';
import RealEstateCard from './RealEstateCard.js';
//import './Listing.css';

class Listing extends Component {
  render() {
    var columns = this.props.posts.map(post => this.renderColumn(post))
    return (
      <div>
        <div className="columns is-multiline">
          {columns}
        </div>
      </div>
    );
  }

  renderColumn(post){
    return (<div className="column is-one-quarter-desktop is-half-tablet">
      <RealEstateCard 
        title={post.title}
        price={post.price}
        description={post.description}
        mainPhotoUrl={post.mainPhotoUrl}
        lastUpdated={post.lastUpdated}/>
    </div>);
  }
}

export default Listing;
