import React, { useReducer, useCallback, useEffect } from 'react';

import {
  Button,
  Grid,
  TextField
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  getDepartments,
  getRegions,
  getTownshipByFullAddress,
  getTownships
} from '../../API/main';

import { useDispatch } from 'react-redux';
import { actionSetTownShip } from '../action';

const initialState = {
  departmentList: [],
  regionList: [],
  regionsLoaded : false,
  selectedRegion: '',
  selectedDepartment: '',
  selectedTownship: '',
  townShipList: [],
};

const SET_REGION_LIST = 'SET_REGION_LIST';
const SET_SELECTED_REGION = 'SET_SELECTED_REGION';

const SET_DEPARTMENT_LIST = 'SET_DEPARTMENT_LIST';
const SET_SELECTED_DEPARTMENT = 'SET_SELECTED_DEPARTMENT';

const SET_TOWN_SHIP_LIST = 'SET_TOWN_SHIP_LIST';
const SET_SELECTED_TOWNSHIP = 'SET_SELECTED_TOWNSHIP';

const reducer = (state, action) => {
  switch (action.type) {

    case SET_REGION_LIST:
      return {
        ...state,
        regionList: action.value,
        regionsLoaded: true,
      };

    case SET_SELECTED_REGION:
      return {
        ...state,
        selectedRegion: action.value,
        departmentList: [],
        selectedDepartment: '',
        selectedTownship: '',
        townShipList: [],
      };

    case SET_DEPARTMENT_LIST:
      return {
        ...state,
        departmentList: action.value,
        selectedTownship: '',
        townShipList: [],
      };

    case SET_SELECTED_DEPARTMENT:
      return {...state, selectedDepartment: action.value};

    case SET_TOWN_SHIP_LIST:
      return {
        ...state,
        townShipList: action.value,
      };

    case SET_SELECTED_TOWNSHIP:
      return {...state, selectedTownship: action.value};

    default:
      return state;
  }
};

const TabFullAddress = () => {
  const dispatch = useDispatch();

  const [
    {
      departmentList,
      regionList,
      regionsLoaded,
      selectedRegion,
      selectedDepartment,
      selectedTownship,
      townShipList,
    },
    dispatchState,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!regionsLoaded) {
      let unmounted = false;
      getRegions()
        .then((regions) => {
          if (!unmounted) {
            dispatchState({ type: SET_REGION_LIST, value: regions });
          }
        })
        .catch((error) => {
          console.error('get region', error);
        });

      return () => {
        unmounted = true;
      };
    }
  }, [regionsLoaded]);

  const onClickItemRegion = useCallback((e) => {
    const regionName = e.target.value;
    dispatchState({ type: SET_SELECTED_REGION, value: regionName });
    getDepartments(regionName)
      .then((departments) => {
        dispatchState({ type: SET_DEPARTMENT_LIST, value: departments });
      })
      .catch((error) => {
        console.error('', error);
      });  
  }, []);

  const onClickItemDepartment = useCallback((e) => {
    const departmentName = e.target.value;
    dispatchState({ type: SET_SELECTED_DEPARTMENT, value: departmentName });
    getTownships(selectedRegion, departmentName)
      .then((townShips) => {
        dispatchState({ type: SET_TOWN_SHIP_LIST, value: townShips });
      })
      .catch((error) => {
        console.error('getTownship', error);
      });
  }, [selectedRegion]);

  const onClickItemTownShip = useCallback((e) => {
    const townshipName = e.target.value;
    dispatchState({ type: SET_SELECTED_TOWNSHIP, value: townshipName });
  }, []);

  const toggleSearch = useCallback(() => {
    getTownshipByFullAddress(selectedRegion, selectedDepartment, selectedTownship)
      .then((township) => {
        dispatch(actionSetTownShip(township));
      })
      .catch((e) => {
        console.error('getTownshipByFullAddress', e);
      });
  }, [dispatch, selectedDepartment, selectedRegion, selectedTownship]);

  return (
    <Grid container item xs={12} style={{ marginTop: 20, justifyContent: 'space-between' }}>
      <Grid item md={3}>
        <Autocomplete
          options={regionList}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Région"
              placeholder="Région"
              variant="outlined"
            />
          )}
          onSelect={onClickItemRegion}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </Grid>
      <Grid item md={3}>
        <Autocomplete
          options={departmentList}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Département"
              placeholder="Département"
              variant="outlined"
            />
          )}
          onSelect={onClickItemDepartment}
        />
      </Grid>
      <Grid item md={3}>
        <Autocomplete
          options={townShipList}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Commune"
              placeholder="Commune"
              variant="outlined"
            />
          )}
          onSelect={onClickItemTownShip}
        />
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={toggleSearch}
      >
        Recherche
      </Button>
    </Grid>
  );
}

export default TabFullAddress;
