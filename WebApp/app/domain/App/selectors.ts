import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';


/**
 * Direct selector to the user state domain
 */

// const selectAppDomain = (state: ApplicationRootState) => state.app;

const selectCurrentlySending = (state: ApplicationRootState) => {
  return state.global.currentlySending;
};

const selectIsConnected = (state: ApplicationRootState) => {
  // TODO check provider state
  return state.global.connected;
};

export const makeSelectIsConnected =
  createSelector(selectIsConnected, substate => {
    return substate;
  });

export const makeSelectCurrentlySending =
  createSelector(selectCurrentlySending, substate =>{
    return substate;
  })
/**
 * Other specific selectors
 */


/**
 * Default selector used by App
 */

// export default selectApp;
