import React, { Component } from 'react';
//import './RealStateCard.css';

class RealEstateCard extends Component {
  render() {
    return (
      <div className="card">
        {this.renderCardImage()}
        {this.renderCardContent()}
      </div>
    );
  }

  renderCardImage() {
    return(
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={this.getMainPhotoUrl()} alt="House"/>
        </figure>
      </div>
    );
  }

  getMainPhotoUrl(){
    return this.props.mainPhotoUrl ? this.props.mainPhotoUrl : '/img/property.jpg'
  }

  renderCardContent(){
    return(
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-5">{this.props.title}</p>
          </div>
          <div className="media-right">
            <p className="title is-4">{this.props.price} &euro;</p>
          </div>
        </div>

        <div className="content">
          <p className="is-size-7">
            {this.props.description}
          </p>
          <time className="is-size-7" dateTime="2016-1-1">
            {this.props.lastUpdated}
          </time>
        </div>
      </div>
    );
  }
}

export default RealEstateCard;
