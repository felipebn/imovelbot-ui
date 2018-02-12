import React, { Component } from 'react';
//import './RealEstatePanel.css';

class RealEstatePanel extends Component {
  render() {
    if(this.props.post == null) return null;
    var post = this.props.post
    return (
      <section className="hero is-dark is-fullheight" style={{alignItems: 'start'}}>
        <div className="hero-body" style={{paddingTop:'10px'}}>
          <div>
            <div className="columns">
              <div className="column">
                <h1 className="title">
                  {post.title}
                </h1>
                <p>
                  {post.description} (Show more...)
                </p>
              </div>
              <div className="column is-two-thirds">
                <img src={post.mainPhotoUrl} alt="House"/>
              </div>
            </div>
          </div>
          <div>
           (Pic carrousel here....)
          </div>
        </div>
      </section>
    );
  }

}

export default RealEstatePanel;
