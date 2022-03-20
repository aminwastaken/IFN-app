import React, { useCallback, useState } from "react";

import { Button, Grid, TextField, Input } from "@material-ui/core";

import { useDispatch } from "react-redux";

import { getTownshipByPostalCode } from "../../API/main";
import { actionSetTownShip } from "../action";

const TabPostalCode = () => {
  const [postalCode, setPostalCode] = useState("");
  const dispatch = useDispatch();

  const toggleChange = useCallback((e) => {
    if (e.target.value.length <= 5) {
      setPostalCode(e.target.value);
    }
  }, []);

  const toggleSearch = useCallback(() => {
    if (postalCode.length === 5) {
      getTownshipByPostalCode(postalCode)
        .then((townShip) => {
          dispatch(actionSetTownShip(townShip));
        })
        .catch((e) => {
          console.error("getTownshipByPostalCode", e);
        });
    }
  }, [dispatch, postalCode]);

  return (
    <Grid container spacing={3}>
      <Grid container item xs justify="center">
        <Input
          type="number"
          placeholder="Code Postal"
          value={postalCode}
          onChange={toggleChange}
          error={postalCode !== "" && postalCode.length !== 5}
          helperText="Votre code postal doit contenir 5 chiffres"
        />
      </Grid>
      <Grid container item xs justify="center">
        <Button variant="contained" color="#226653" onClick={toggleSearch}>
          Calculer
        </Button>
      </Grid>
    </Grid>
  );
};

export default TabPostalCode;
