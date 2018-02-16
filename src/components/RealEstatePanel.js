import React, { Component } from 'react';
import './RealEstatePanel.css';

class RealEstatePanel extends Component {
  render() {
    if(this.props.post == null) return null;
    var post = this.props.post
    return (
      <section className="hero is-dark is-fullheight" style={{alignItems: 'start'}}>
        <div className="hero-body" style={{paddingTop:'10px'}}>          
          <div className="realEstatePanel-container">
            <div className="columns">
              <div className="column">
                <h1 className="title">
                  {post.title}
                </h1>
                <p>
                  {post.description}
                </p>
              </div>
              <div className="column is-two-thirds">
                <img src={post.mainPhotoUrl} alt="House"/>
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
      <div className="column has-text-centered" style={{minWidth:"128px"}}>
        <img className="test" src={photoUrl} className="realEstatePanel-thumbnail"/>
      </div>
    )
  }

}

export default RealEstatePanel;
