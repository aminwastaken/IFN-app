import React from "react";
import { useSelector } from "react-redux";

import { Grid, Paper } from "@material-ui/core";

import {
  DescriptionOutlined,
  InfoOutlined,
  SettingsInputAntennaOutlined,
  TouchAppOutlined,
  HomeOutlined,
  DomainOutlined,
  ApartmentOutlined,
} from "@material-ui/icons";

import { useTheme, makeStyles } from "@material-ui/core/styles";

const selector = ({ townShip, showResult }) => ({ townShip, showResult });

const useStyles = makeStyles((theme) => ({
  scoreText: {
    fontSize: 18,
    lineHeight: 2,
  },
  descriptionIcons: {
    color: theme.palette.primary.main,
    fontSize: 40,
    paddingLeft: 10,
  },
  iconContainer: {
    textAlign: "center",
    paddingLeft: 20,
  },
  paperContainer: {
    backgroundColor: "#226653",
    color: theme.palette.primary.contrastText,
    display: "flex",
    justifyContent: "center",
  },
  rowContainer: {
    marginTop: "20px",
  },
  scoreIcons: {
    color: theme.palette.primary.contrastText,
    fontSize: 20,
  },
}));

const Footer = () => {
  const theme = useTheme();
  const classes = useStyles();

  const { showResult, townShip } = useSelector(selector);

  function getColor(score) {
    if (score >= 80 && score <= 130) {
      return theme.palette.average.main;
    }

    if (score > 130) {
      return theme.palette.negative.main;
    }

    if (score < 80) {
      return theme.palette.secondary.main;
    }
  }

  function getSentence(townshipScore, townshipName) {
    if (townshipScore >= 80 && townshipScore <= 130) {
      return `La commune ${townshipName} est modérément fragile dans le cadre du dévelopement numérique.`;
    }

    if (townshipScore > 130) {
      return `La commune ${townshipName} a de grosses lacunes en termes de fragilité numérique.`;
    }

    if (townshipScore < 80) {
      return `La commune ${townshipName} se révèle être d'une solidité numérique exemplaire.`;
    }
  }

  return (
    <>
      {showResult && townShip !== null && (
        <>
          <Paper elevation={5} style={{ minWidth: "100%", padding: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                minWidth: "100%",
              }}
            >
              <div style={{ color: "#226653", fontWeight: "bold" }}>
                COMPETENCES ADMINISTATIVES:
              </div>
              <div>{townShip["COMPETENCES ADMINISTATIVES"]}</div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                minWidth: "100%",
              }}
            >
              <div style={{ color: "#226653", fontWeight: "bold" }}>
                ACCES A L'INFORMATION:
              </div>
              <div>{townShip["ACCES A L'INFORMATION"]}</div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                minWidth: "100%",
              }}
            >
              <div style={{ color: "#226653", fontWeight: "bold" }}>
                ACCÈS AUX INTERFACES NUMERIQUES:
              </div>
              <div>{townShip["ACCÈS AUX INTERFACES NUMERIQUES"]}</div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                minWidth: "100%",
              }}
            >
              <div style={{ color: "#226653", fontWeight: "bold" }}>
                COMPÉTENCES NUMÉRIQUES / SCOLAIRES:
              </div>
              <div>{townShip["COMPÉTENCES NUMÉRIQUES / SCOLAIRES"]}</div>
            </div>
          </Paper>
          <Grid container spacing={3} className={classes.rowContainer}>
            <Grid item xs style={{ height: "200px" }}>
              <Paper elevation={5} className={classes.paperContainer}>
                <Grid
                  container
                  spacing={3}
                  style={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Grid item xs={8} className={classes.scoreText}>
                    Région: {townShip["region_score"]}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs style={{ height: "200px" }}>
              <Paper elevation={5} className={classes.paperContainer}>
                <Grid
                  container
                  spacing={3}
                  style={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Grid item xs={8} className={classes.scoreText}>
                    Département: {townShip["department_score"]}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs style={{ height: "200px" }}>
              <Paper elevation={5} className={classes.paperContainer}>
                <Grid
                  container
                  spacing={3}
                  style={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Grid item xs={8} className={classes.scoreText}>
                    Commune: {townShip["township_score"]}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ height: "200px" }}>
            <Grid
              item
              xs
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Paper elevation={5} className={classes.paperContainer}>
                <p
                  style={{ paddingLeft: 10, fontSize: 20, textAlign: "center" }}
                >
                  {getSentence(
                    townShip["township_score"],
                    townShip["townshipName"]
                  )}
                </p>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Footer;
