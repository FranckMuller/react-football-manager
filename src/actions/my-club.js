const updateMyClub = (data) => {
  console.log(data);
  return {
    type: 'UPDATE_MY_CLUB',
    payload: data
  }
};

export {
  updateMyClub
};
