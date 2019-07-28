 const updateMyClub = (data) => {
  return {
    type: 'UPDATE_MY_CLUB',
    payload: data
  };
};

const changeStepCount = (count) => {
  return {
    type: 'CHANGE_STEP_COUNT',
    payload: count
  };
};

const animationStep = (animation) => {
  return {
    type: 'ANIMATION_STEP',
    payload: animation
  }
}

const toggleStep = (dispatch, stepCounter, data = null) => {

  console.log(stepCounter)
  
  if(stepCounter === 1) {
    dispatch(updateMyClub(data));
    dispatch(animationStep('out-left'));
    setTimeout(() => {
      dispatch(changeStepCount(stepCounter));
      dispatch(animationStep('in-right'));
    }, 500);
  } else {
    dispatch(animationStep('out-right'));
    setTimeout(() => {
      dispatch(changeStepCount(stepCounter));
      dispatch(animationStep('in-left'));
    }, 500);
  }
};

export {
  toggleStep
};
