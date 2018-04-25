import React, { Component } from 'react';
import './RealEstatePhotoCarousel.css';

class RealEstatePhotoCarousel extends Component {
  constructor(props){
    super(props)
    this.state = {
      carouselOffset: 0
    }
    this.thumbnailsContainerRef = React.createRef();
    this.rightArrowRef = React.createRef();
  }

  render() {
    return (
      <div className="columns">
        {this.renderLeftArrow()}
        {this.renderThumbnails()}
        {this.renderRightArrow()}
      </div>
    )
  }

  componentDidMount(){
    this.setRightArrowState();
  }

  componentDidUpdate(){
    this.setRightArrowState();
  }
  
  renderLeftArrow(){
    var disabledClass = this.state.carouselOffset === 0 ? ' disabled ' : ''
    return (
      <div className={"column is-1 realEstatePhotoCarousel-carousel-arrows" + disabledClass}>
        <i className="fa fa-angle-left fa-5x" onClick={() => this.slideLeft()}></i>
      </div>
    )
  }
  
  renderThumbnails(){
    if(this.props.photos && this.props.photos.length === 0)
      return (<div ref={this.thumbnailsContainerRef} className="column is-10 has-text-centered is-size-7 realEstatePhotoCarousel-thumbnails-empty"><p>This listing does not have more photos.</p></div>)

    var thumbnails = (this.props.photos || []).map(photo => this.renderPhotoThumbnail(photo.url))
    var leftPx = (-1 * this.state.carouselOffset) + 'px'
    
    return (
      <div className="column is-10 is-clipped realEstatePhotoCarousel-thumbnails-container">
        <div ref={this.thumbnailsContainerRef} className="columns" style={{left:leftPx}}>
          {thumbnails}
        </div>
      </div>
    )
    
  }
  
  renderPhotoThumbnail(photoUrl){
    return(
      <div className="realEstatePhotoCarousel-thumbnail has-text-centered" style={{minWidth:"128px"}} key={photoUrl}>
        <img src={photoUrl} onClick={() => this.props.onThumbnailClick(photoUrl)} alt={`post extra`}/>
      </div>
    )
  }

  renderRightArrow(){
    return (
      <div ref={this.rightArrowRef} className="column is-1 realEstatePhotoCarousel-carousel-arrows">
        <i className="fa fa-angle-right fa-5x" onClick={() => this.slideRight()}></i>
      </div>
    )
  }

  setRightArrowState(){
    var disable = this.isLastPhotoVisible();
    if(disable){
      this.rightArrowRef.current.className += " disabled";
    }else{
      this.rightArrowRef.current.className = this.rightArrowRef.current.className.replace(' disabled', '');
    }
  }

  isLastPhotoVisible(){
    var sliderNode = this.thumbnailsContainerRef.current;
    var arrowNode = this.rightArrowRef.current;
    var sliderRightEnding = sliderNode.clientWidth + sliderNode.parentNode.offsetLeft - this.state.carouselOffset - 10;
    return sliderRightEnding < arrowNode.offsetLeft;
  }

  slideLeft(){
    this.setState(oldState => ({carouselOffset: Math.max(oldState.carouselOffset - 138, 0)}))
  }

  slideRight(){
    if(this.isLastPhotoVisible()) return;
    this.setState(oldState => ({carouselOffset: Math.min(oldState.carouselOffset + 138, this.props.photos.length * 138)}))
  }
}

export default RealEstatePhotoCarousel;
