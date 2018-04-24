import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRealEstateListing, doSetTitle } from '../state/store';
import RealEstateCard from './RealEstateCard';
import './Listing.css';

class Listing extends Component {

  componentDidMount(){
    
    //Unclip body
    document.body.classList.remove("is-clipped")
  }

  render() {
    var columns = (this.props.posts || []).map(post => this.renderColumn(post))
    return (
      <div className="listing-container">
        <div className="columns is-multiline">
          {columns}
        </div>
      </div>
    );
  }

  renderColumn(post){
    return (<div className="column is-one-quarter-desktop is-half-tablet" key={post.id}>
      <RealEstateCard 
        title={post.title}
        price={post.price}
        description={post.description}
        mainPhotoUrl={post.mainPhotoUrl}
        lastUpdated={post.lastUpdated}
        postId={post.id}/>
    </div>);
  }
}

const mapStateToProps = (state) => {
  console.log("Mapping state to Listing.props", state)
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListing: () => {
      dispatch(fetchRealEstateListing());
      dispatch(doSetTitle("Listing"));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
