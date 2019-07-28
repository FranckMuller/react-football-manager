import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import throttle from 'lodash/throttle'

import reducer from './reducers';

const loadState = () => { 
  try { 
    const serializedState = localStorage.getItem('state'); 
    if (serializedState === null) { 
      return undefined; 
    } 
    return JSON.parse(serializedState); 
  } catch (err) { 
    return undefined; 
  } 
};

const saveState = (state) => { 
  try { 
    const serializedState = JSON.stringify(state); 
    localStorage.setItem('state', serializedState);
  } catch { 
    // игнорировать ошибки записи 
  } 
};

const presistedState = loadState();

const store = createStore(reducer, applyMiddleware(thunk, logger));

store.subscribe (throttle (() => { 
  saveState(store.getState()); 
}, 1000));

export default store;
