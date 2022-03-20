export const SHOW_TOWNSHIP_RESULT = 'SHOW_TOWNSHIP_RESULT';
export const SET_TOWN_SHIP = 'SET_TOWN_SHIP';

export const actionSetTownShip = (townShip = null) => ({
  type: SET_TOWN_SHIP,
  value: townShip,
});

export const actionShowTownShipResult = () => ({
  type: SHOW_TOWNSHIP_RESULT
});
