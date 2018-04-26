import React, { Component } from 'react';
import './AttributeTag.css';

class AttributeTag extends Component {
  render(){
      var infos = Array.isArray(this.props.infos) ? this.props.infos : [this.props.infos]
      var infoTags = infos.map(text => <span key={text} className="tag value is-success">{this.renderTagValue(text)}</span>)
      return (
        <div className="control attributeTag">
            <div className="tags has-addons">
            <span className="tag type is-dark">
              <img src={this.getIconUrl(this.props.type)} alt={this.props.type} title={this.props.type}/>
            </span>
            {infoTags}
            </div>
        </div>
      )
  }

  renderTagValue(text){
    return text === "true" || text === "false" ? (<img src={this.getIconUrl(text)} alt={text}/>) : text;
  }

  getIconUrl(label){
    var typeToIcon = {
      "type":"/img/icons/icons8-floorplan-32.png",
      "size":"/img/icons/icons8-drag-32.png",
      "bathrooms":"/img/icons/icons8-shower-32.png",
      "furnished": "/img/icons/icons8-sofa-32.png",
      "special":"/img/icons/icons8-star-32.png",
      "true":"/img/icons/icons8-checkmark-white-32.png",
      "false":"/img/icons/icons8-close-white-32.png"

    };
    return typeToIcon[label];
  }
}

export default AttributeTag;