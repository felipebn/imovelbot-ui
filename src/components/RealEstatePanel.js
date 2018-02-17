import React, { Component } from 'react';
import './RealEstatePanel.css';

class RealEstatePanel extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentPhotoUrl: null,
      carouselOffset: 0
    }
  }

  render() {
    if(this.props.post == null) return null;
    var post = this.props.post
    return (
      <section className="hero is-dark is-fullheight" style={{alignItems: 'start', maxHeight:'100vh'}}>
        <div className="hero-body" style={{paddingTop:'10px', maxWidth:'100%'}}>          
          <div className="realEstatePanel-container">
            <div className="columns" style={{maxHeight:'70vh'}}>
              <div className="column">
                <h1 className="title">
                  {post.title}
                </h1>
                <p>
                  {post.description}
                </p>
              </div>
              <div className="column is-two-thirds has-text-centered">
                <img src={this.state.currentPhotoUrl || post.mainPhotoUrl} alt="House" style={{maxHeight:'100%', objectFit:'scale-down'}}/>
              </div>
            </div>
            {this.renderPhotoCarousel(post.photos)}
          </div>
        </div>
      </section>
    );
  }

  renderPhotoCarousel(photos){
    var thumbnails = (photos || []).map(url => this.renderPhotoThumbnail(url))
    //TODO disable arrows and add message indicating that there are no pics
    return (
      <div className="columns">
        <div className="column is-1 realEstatePanel-carousel-arrows">
          <i className="fa fa-angle-left fa-5x"></i>
        </div>
        <div className="column is-10 is-clipped">
          <div className="columns">
            {thumbnails}
          </div>
        </div>
        <div className="column is-1 realEstatePanel-carousel-arrows">
          <i className="fa fa-angle-right fa-5x is-pulled-right"></i>
        </div>
      </div>
    )
  }

  renderPhotoThumbnail(photoUrl){
    return(
      <div className="realEstatePanel-thumbnail has-text-centered" style={{minWidth:"128px"}}>
        <img src={photoUrl} onClick={() => this.changePhoto(photoUrl)}/>
      </div>
    )
  }

  changePhoto(photoUrl){
    console.log("lets change to", photoUrl)
    this.setState({currentPhotoUrl: photoUrl})
  }
}

export default RealEstatePanel;
