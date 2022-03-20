import React, { useCallback, useState } from "react";
import { Grid, Tabs, Tab } from "@material-ui/core";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import TabFullAdress from "./TabFullAddress";
import TabPostalCode from "./TabPostalCode";

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    backgroundColor: "#FFF",
    width: "100%",
    minHeight: 172,
  },
}));

const SelectTownship = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(1);

  const handleChange = useCallback((_, newValue) => {
    setValue(newValue);
  }, []);

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Grid container item xs={12} style={{ justifyContent: "center" }}>
      <div className={classes.root}>
        <AppBar position="static" color="#226653">
          <Tabs
            value={value}
            indicatorColor="#226653"
            textColor="#226653"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Code Postal" {...a11yProps(0)} />
            <Tab label="Adresse" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <TabPostalCode />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <TabFullAdress />
          </TabPanel>
        </SwipeableViews>
      </div>
    </Grid>
  );
};

export default SelectTownship;
