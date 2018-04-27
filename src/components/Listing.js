import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRealEstateListing, doSetTitle } from '../state/store';
import RealEstateCard from './RealEstateCard';
import './Listing.css';

class Listing extends Component {
  constructor(props){
    super(props)
    this.lastPostRef = React.createRef();
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
    //Unclip body
    document.body.classList.remove("is-clipped")
  }

  componentWillMount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    document.title = this.props.pageTitle;
    var index = 0
    var columns = (this.props.posts || []).map(post => this.renderPost(index++, post))
    return (
      <div className="listing-container">
        <div className="columns is-multiline">
          {columns}
        </div>
      </div>
    );
  }

  renderPost(index, post){
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

  handleScroll(){
    console.log("page scroll..", window.scrollY, window.innerHeight)
    console.log("last post ref", this.lastPostRef.offsetTop)
  }
}

const mapStateToProps = (state) => {
  console.log("Mapping state to Listing.props", state)
  return {
    posts: state.posts,
    pageTitle: state.pageTitle
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
