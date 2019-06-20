import React from 'react';

const FormattingMoney = ({ money }) => {

  let formattedNumber;

  if(String(money).length > 9) {
    formattedNumber = money / 1000000000 + 'b'
  } else {
    formattedNumber = money / 1000000 + 'm'
  };

  return <span>${formattedNumber}</span>
};

export default FormattingMoney;
