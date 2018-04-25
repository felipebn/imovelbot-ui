import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchRealEstateListing, fetchRealEstatePost } from '../state/store';
import AttributeTag from './AttributeTag'
import RealEstatePhotoCarousel from './RealEstatePhotoCarousel'
import './RealEstatePanel.css';

class RealEstatePanel extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentPhotoUrl: null,
    }
    this.handleBackToListingClick = this.handleBackToListingClick.bind(this);
    this.handleChangePhoto = this.handleChangePhoto.bind(this);
  }

  componentDidMount(){
    if(this.props.post == null){
      this.props.fetchRealEstatePost(this.props.match.params.id);                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    }
    //Clip body: see this for improvement: https://jaketrent.com/post/update-body-class-react/
    document.body.classList.add("is-clipped")
  }

  getPost(){
    return this.props.post
  }

  render() {
    var post = this.getPost()
    if(post == null) return null
    return (
      <section className="hero is-fullheight realEstatePanel-section">
        <div className="hero-body" style={{paddingTop:'10px', width:'100%'}}>          
          <div className="realEstatePanel-container">
            <div className="columns" style={{height:'70vh'}}>
              <div className="column">
                <div className="columns">
                  <div className="column">
                    <h3 className="title">
                      <Link to="/" onClick={this.handleBackToListingClick} className="realEstatePanel-backlink"><i className="fa fa-angle-double-left fa-1x"></i></Link>
                      {post.title}
                    </h3>
                  </div>
                  <div className="column is-one-quarter has-text-right is-size-3">
                    <h3>{post.price} &euro;</h3>
                  </div>
                </div>
                <div className="field is-grouped is-grouped-multiline">
                {this.renderAttributeTags()}
                </div>
                <p>
                  {post.description}
                </p>
              </div>
              <div className="column is-three-fifths has-text-centered">
                <img src={this.state.currentPhotoUrl || post.mainPhotoUrl} alt="House" style={{maxHeight:'100%', objectFit:'scale-down'}}/>
              </div>
            </div>
            <RealEstatePhotoCarousel photos={post.photos} onThumbnailClick={this.handleChangePhoto}/>
          </div>
        </div>
      </section>
    );
  }

  handleBackToListingClick(){
    this.props.fetchRealEstateListing();
  }

  renderAttributeTags(){
    var expectedAttributes = [
      "type", "size", "bathrooms", "furnished"
    ];
    return expectedAttributes
      .filter(prop => this.getPost()[prop] != null)
      .map(prop => (<AttributeTag type={prop} infos={this.getPost()[prop]}/>))
  }

  handleChangePhoto(photoUrl){
    console.log("lets change to", photoUrl)
    this.setState({currentPhotoUrl: photoUrl})
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
    fetchRealEstatePost: (postId) => dispatch(fetchRealEstatePost(postId, true)),
    fetchRealEstateListing: () => dispatch(fetchRealEstateListing()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RealEstatePanel);
