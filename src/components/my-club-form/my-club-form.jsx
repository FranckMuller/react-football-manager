import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import { FirstStep, SecondStep } from './steps';

import 'moment-timezone';

import 'react-datepicker/dist/react-datepicker.css';

import './my-club-form.scss'

class MyClubForm extends Component {

  render() {
    const { onDropImage, clubLogo, onChangeInput, step, onToggleSteps, clubName } = this.props;
    let stepView;
    switch(step) {
      case 1:
        stepView = <FirstStep
                      onToggleSteps={onToggleSteps}
                      onChangeInput={onChangeInput} 
                      onDropImage={onDropImage} 
                      clubLogo={clubLogo}
                      clubName={clubName} />
        break;
      case 2: {
        stepView = <SecondStep />
      }
    }

    return (
      <div className="my-club-form d-flex flex-column align-items-center">
        <h3 className="title-page text-center">
          Club configuration
        </h3>
        <form action="" className="d-flex flex-column align-items-center">
          {stepView}
        </form>
      </div>
    );
  };
};


// class MyClubForm extends Component {

//   render() {
//     const { formFields, onDropImage, onChangeInput, onFormSubmit, onChangeBirthYear } = this.props;

//     const fields = formFields.map(({ label, name, image, birthYear }) => {
//       const viewZone = image !== null ? <img src={image} /> : <div className="placeholder">Select or drag {label} photo</div>;
//       return (
//         <div key={label} className="form-group d-flex flex-column">
//           <div className="title text-center">{label.slice(0, 1).toUpperCase() + label.slice(1)}</div>
//           <div className="input-group d-flex flex-column">
//             <div className="title-form-group flex-grow-1 flex-shrink-1">Name</div>
//             <input
//               type="text"
//               defaultValue={name}
//               placeholder={`Enter name ${label.toLowerCase()}`}
//               onChange={(e) => onChangeInput(e, label)} />
//           </div>
//           <div className="input-group d-flex flex-column">
//             <div className="title-form-group flex-grow-1 flex-shrink-1">Birth year</div>
//             <DatePicker
//               customInput={<CustomInput dateValue={birthYear} />}
//               dateFormat="yyyy-mm-dd"
//               onChange={(date) => onChangeBirthYear(date, label)}
//               peekNextMonth
//               showMonthDropdown
//               showYearDropdown
//               dropdownMode="select" />
//             <div className="title-form-group flex-grow-1 flex-shrink-1">{label === 'club' ? 'Logo' : 'Photo'}</div>
//             <ReactDropzone
//               onDrop={(accepted) => { onDropImage(accepted, label) }}>
//               {({ getRootProps, getInputProps, isDragActive }) => (
//                 <div
//                   className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')}
//                   {...getRootProps()}>
//                   <input {...getInputProps()} />
//                   {viewZone}
//                 </div>
//               )}
//             </ReactDropzone>
//           </div>
//         </div>
//       );
//     });

//     return (
//       <div className="my-club-form">
//         <h3 className="title-page text-center">
//           Club configuration
//         </h3>
//         <form action="" className="d-flex flex-wrap">
//           {fields}
//           <button onClick={onFormSubmit} className="btn">Submit</button>
//         </form>
//       </div>
//     );
//   }
// };

export default MyClubForm;
