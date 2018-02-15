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
      <div className="card-content" style={{padding:"0.75rem"}}>
        <div className="media">
          <div className="media-content">
            <p className="title is-5" style={{float:"right", margin:"0px"}}>{this.props.price} &euro;</p>
            <p className="title is-5 has-text-weight-light" style={{marginTop:"0px"}}>{this.props.title}</p>
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
