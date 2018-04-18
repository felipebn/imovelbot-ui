import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchRealEstatePost } from '../state/store';
import './RealEstateCard.css';

class RealEstateCard extends Component {
  constructor(props){
    super(props);
    this.handlePostClick = this.handlePostClick.bind(this);
  }

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
          <Link to={"/realEstate/" + this.props.postId} onClick={this.handlePostClick}>
            <img className="realEstateCard-thumbnail" src={this.getMainPhotoUrl()} alt="House"/>
          </Link>
        </figure>
      </div>
    );
  }

  handlePostClick(){
    this.props.fetchRealEstatePost(this.props.postId);
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
            {this.getEllipziedDescription()}
          </p>
          <time className="is-size-7" dateTime="2016-1-1">
            {this.props.lastUpdated}
          </time>
        </div>
      </div>
    );
  }

  getEllipziedDescription(){
    let length = 150;
    //200 - 150 = 50
    //150 - 150 = 0
    //150 - 140 = -10
    let delta = this.props.description.length - length; 
    if(delta > 3){
      return this.props.description.substring(0, length) + "..."; 
    }else{
      return this.props.description;
    }
  }

}

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRealEstatePost: (postId) => dispatch(fetchRealEstatePost(postId, true))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RealEstateCard);
