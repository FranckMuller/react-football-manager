import React, { Component } from 'react';

import './item-details.scss';

class ItemDetails extends Component {

  render() {

    let child = null;
    if (this.props.children) {
      console.log(this.props.children);
      child = this.props.children;
    }

    const { item: { name, image, position, cost, rating }} = this.props;

    return (
      <div className="item-details d-flex flex-column justify-content-between">
        <div className="name text-center">{name}</div>
        <div className="rating text-center">
          <i className="fa fa-star" /> {rating}
        </div>
        <div className="photo">
          <img src={image} alt={name} />
        </div>
        <div className="description">
          <div className="position d-flex justify-content-between">
            <span>Posisition:</span>
            <span className="font-weight-bold">{position}</span>
          </div>
          <div className="cost d-flex justify-content-between">
            <span>Cost:</span>
            <span className="font-weight-bold">{cost}$</span>
          </div>
        </div>
        {child}
      </div>
    );
  }
  
}

//   let child = null

//   if(!Object.keys(children).length === 0) {
//     child = children;
//     console.log(child)
//   }

//   return (
//     <div className="item-details d-flex flex-column justify-content-between">
//       <div className="name text-center">{name}</div>
//       <div className="rating text-center">
//         <i className="fa fa-star" /> {rating}
//       </div>
//       <div className="photo">
//         <img src={image} alt={name} />
//       </div>
//       <div className="description">
//         <div className="position d-flex justify-content-between">
//           <span>Posisition:</span>
//           <span className="font-weight-bold">{position}</span>
//         </div>
//         <div className="cost d-flex justify-content-between">
//           <span>Cost:</span>
//           <span className="font-weight-bold">{cost}$</span>
//         </div>
//         {child}
//       </div>
//     </div>
//   );
// };

export default ItemDetails;