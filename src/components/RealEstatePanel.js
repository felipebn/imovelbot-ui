import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchRealEstatePost } from '../store';
import { fetchRealEstateListing } from '../store';
import './RealEstatePanel.css';

class RealEstatePanel extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentPhotoUrl: null,
      carouselOffset: 0
    }
    this.handleBackToList = this.handleBackToList.bind(this);
  }

  componentDidMount(){
    if(this.props.post == null)
      this.props.fetchRealEstatePost(this.props.postId);
    //Clip body: see this for improvement: https://jaketrent.com/post/update-body-class-react/
    document.body.classList.add("is-clipped")
  }

  componentWillReceiveProps(){
    console.log("componentWillReceiveProps", this.props.post)
    if(this.props.post)
      document.title = this.props.post.title;
  }

  getPost(){
    return this.props.post
  }

  render() {
    var post = this.getPost()
    if(post == null) return null;
    return (
      <section className="hero is-dark is-fullheight" style={{alignItems: 'start', maxHeight:'100vh'}}>
        <div className="hero-body" style={{paddingTop:'10px', maxWidth:'100%'}}>          
          <div className="realEstatePanel-container">
            <div className="columns" style={{maxHeight:'70vh'}}>
              <div className="column">
                <h3 className="title">
                  <Link to="/" onClick={this.handleBackToList} className="realEstatePanel-backlink"><i className="fa fa-angle-double-left fa-1x"></i></Link>
                  {post.title}
                </h3>
                <p>
                  {post.description}
                </p>
              </div>
              <div className="column is-three-fifths has-text-centered">
                <img src={this.state.currentPhotoUrl || post.mainPhotoUrl} alt="House" style={{maxHeight:'100%', objectFit:'scale-down'}}/>
              </div>
            </div>
            {this.renderPhotoCarousel(post.photos)}
          </div>
        </div>
      </section>
    );
  }

  handleBackToList(){
    this.props.fetchRealEstateListing();
  }

  renderPhotoCarousel(photos){
    return (
      <div className="columns">
        {this.renderLeftArrow()}
        {this.renderThumbnails(photos)}
        {this.renderRightArrow()}
      </div>
    )
  }
  
  renderLeftArrow(){
    var disabledClass = this.state.carouselOffset == 0 ? ' disabled ' : ''
    return (
      <div className={"column is-1 realEstatePanel-carousel-arrows" + disabledClass}>
        <i className="fa fa-angle-left fa-5x" onClick={() => this.slideLeft()}></i>
      </div>
    )
  }
  
  renderRightArrow(){
    var disabledClass = this.state.carouselOffset == (this.getPost().photos.length * 138) ? ' disabled ' : ''
    return (
      <div className={"column is-1 realEstatePanel-carousel-arrows" + disabledClass}>
        <i className="fa fa-angle-right fa-5x" onClick={() => this.slideRight()}></i>
      </div>
    )
  }
  
  renderThumbnails(photos){
    var thumbnails = (photos || []).map(url => this.renderPhotoThumbnail(url))
    var leftPx = (-1 * this.state.carouselOffset) + 'px'
    if(photos.length == 0)
      return (<div className="column is-10 has-text-centered is-size-7 realEstatePanel-thumbnails-empty"><p>This listing does not have more photos.</p></div>)

    return (
      <div className="column is-10 is-clipped realEstatePanel-thumbnails-container">
        <div className="columns" style={{left:leftPx}}>
          {thumbnails}
        </div>
      </div>
    )
    
  }
  
  renderPhotoThumbnail(photoUrl){
    return(
      <div className="realEstatePanel-thumbnail has-text-centered" style={{minWidth:"128px"}} key={photoUrl}>
        <img src={photoUrl} onClick={() => this.changePhoto(photoUrl)}/>
      </div>
    )
  }

  changePhoto(photoUrl){
    console.log("lets change to", photoUrl)
    this.setState({currentPhotoUrl: photoUrl})
  }

  slideLeft(){
    this.setState(oldState => ({carouselOffset: Math.max(oldState.carouselOffset - 138, 0)}))
  }

  slideRight(){
    //TODO some improvements: we could better calculatewhen to stop (i.e. not wait until the last photo be on zero)
    this.setState(oldState => ({carouselOffset: Math.min(oldState.carouselOffset + 138, this.getPost().photos.length * 138)}))
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("Mapping state to RealEstatePanel.props", state)
  console.log("RealEstatePanel.props ownProps", ownProps)
  return {
    post: state.currentPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRealEstateListing: () => dispatch(fetchRealEstateListing()),
    fetchRealEstatePost: (postId) => dispatch(fetchRealEstatePost(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RealEstatePanel);
