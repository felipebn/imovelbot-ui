import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRealEstateListing, doSetTitle, resumeSearch } from '../state/store';
import RealEstateCard from './RealEstateCard';
import './Listing.css';

class Listing extends Component {
  constructor(props){
    super(props)
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
    var posts = this.props.posts || []
    var columns = posts.map(post => this.renderPost(post))

    return (
      <div className="listing-container">
        <div className="columns is-multiline">
          {columns}
        </div>
      </div>
    );
  }

  renderPost(post){
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

  getWindowMaxScroll(){
    return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) 
              - window.innerHeight;
  }

  handleScroll(){
    if(this.props.isSearchPaused){
      console.log("page scroll..", window.scrollY)
      var currentMax = this.getWindowMaxScroll()
      if(window.scrollY/currentMax > 0.85){
        this.props.resumeSearch();
      }
    }
  }
}

const mapStateToProps = (state) => {
  console.log("Mapping state to Listing.props", state)
  return {
    posts: state.posts,
    pageTitle: state.pageTitle,
    isSearchPaused: state.isSearchPaused
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListing: () => {
      dispatch(fetchRealEstateListing());
      dispatch(doSetTitle("Listing"));
    },

    resumeSearch: () => {
      dispatch(resumeSearch())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
