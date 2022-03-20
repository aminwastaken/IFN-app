import {
  SET_TOWN_SHIP,
  SHOW_TOWNSHIP_RESULT
} from './action';

const initialState = {
  showResult: false,
  townShip: null,
};

export default (state = initialState, action) => {

  switch (action.type) {
    case SHOW_TOWNSHIP_RESULT:
      return {...state, showResult: true};

    case SET_TOWN_SHIP:
      return {
        ...state,
        showResult: true,
        townShip: action.value,
      };

    default:
      return state;
  }
};