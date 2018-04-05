import React, { Component } from 'react';

class AttributeTag extends Component {
  render(){
      var infos = Array.isArray(this.props.infos) ? this.props.infos : [this.props.infos]
      var infoTags = infos.map(text => <span className="tag is-info">{text}</span>)
      return (
        <div className="control">
            <div className="tags has-addons">
            <span className="tag is-dark">{this.props.type}</span>
            {infoTags}
            </div>
        </div>
      )
  }
}

export default AttributeTag;