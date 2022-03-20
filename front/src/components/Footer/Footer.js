import React from 'react';
import { useSelector } from 'react-redux';

import {
  Grid,
  Paper,
} from '@material-ui/core';

import {
  DescriptionOutlined,
  InfoOutlined,
  SettingsInputAntennaOutlined,
  TouchAppOutlined,
  HomeOutlined,
  DomainOutlined,
  ApartmentOutlined,
} from '@material-ui/icons';

import { useTheme, makeStyles  } from '@material-ui/core/styles';

const selector = ({ townShip, showResult }) => ({ townShip, showResult });

const useStyles = makeStyles((theme) => ({
  scoreText: {
    fontSize: 25,
    lineHeight: 2
  },
  descriptionIcons: {
    color: theme.palette.primary.main,
    fontSize: 40,
    paddingLeft: 10,
  },
  iconContainer: {
    textAlign: 'center',
    paddingLeft: 20,
  },
  paperContainer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  rowContainer: {
    marginTop: "20px",
  },
  scoreIcons: {
    color: theme.palette.primary.contrastText,
    fontSize: 40,
  },
}));

const Footer = () => {
  const theme = useTheme();
  const classes = useStyles();

  const {
    showResult,
    townShip,
  } = useSelector(selector);

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
      {
        showResult && townShip !== null && (
          <>
            <Grid container spacing={3} className={classes.rowContainer}>
            <Grid item xs>
              <Paper elevation={5} style={{backgroundColor: getColor(townShip["COMPETENCES ADMINISTATIVES"])}}>
                <Grid container spacing={3}>
                <Grid item xs={2} className={classes.iconContainer}>
                  <DescriptionOutlined className={classes.descriptionIcons} />
                </Grid>
                  <Grid item xs={8} className={classes.scoreText}>{townShip["COMPETENCES ADMINISTATIVES"]}</Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={5} style={{backgroundColor: getColor(townShip["ACCES A L'INFORMATION"])}}>
                <Grid container spacing={3}>
                <Grid item xs={2} className={classes.iconContainer}>
                  <InfoOutlined className={classes.descriptionIcons} />
                </Grid>
                  <Grid item xs={8} className={classes.scoreText}>{townShip["ACCES A L'INFORMATION"]}</Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={5} style={{backgroundColor: getColor(townShip["ACCÈS AUX INTERFACES NUMERIQUES"])}}>
                <Grid container spacing={3}>
                  <Grid item xs={2} className={classes.iconContainer}>
                    <SettingsInputAntennaOutlined className={classes.descriptionIcons} />
                  </Grid>
                    <Grid item xs={8} className={classes.scoreText}>{townShip["ACCÈS AUX INTERFACES NUMERIQUES"]}</Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={5} style={{backgroundColor: getColor(townShip["COMPÉTENCES NUMÉRIQUES / SCOLAIRES"])}}>
                <Grid container spacing={3}>
                  <Grid item xs={2} className={classes.iconContainer}>
                    <TouchAppOutlined className={classes.descriptionIcons} />
                  </Grid>
                    <Grid item xs={8} className={classes.scoreText}>{townShip["COMPÉTENCES NUMÉRIQUES / SCOLAIRES"]}</Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
            <Grid container spacing={3} className={classes.rowContainer}>
              <Grid item xs>
                <Paper elevation={5} className={classes.paperContainer}>
                    <Grid container spacing={3}>
                    <Grid item xs={2} className={classes.iconContainer}>
                      <ApartmentOutlined className={classes.scoreIcons}/>
                    </Grid>
                      <Grid item xs={8} className={classes.scoreText}>Région: {townShip["region_score"]}</Grid>
                    </Grid>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper elevation={5} className={classes.paperContainer}>
                    <Grid container spacing={3}>
                    <Grid item xs={2} className={classes.iconContainer}>
                        <DomainOutlined className={classes.scoreIcons}/>
                    </Grid>
                      <Grid item xs={8} className={classes.scoreText}>Département: {townShip["department_score"]}</Grid>
                    </Grid>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper elevation={5} className={classes.paperContainer}>
                  <Grid container spacing={3}>
                    <Grid item xs={2} className={classes.iconContainer}>
                      <HomeOutlined className={classes.scoreIcons}/>
                    </Grid>
                    <Grid item xs={8} className={classes.scoreText}>Commune: {townShip["township_score"]}</Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs>
                <Paper elevation={5} className={classes.paperContainer}>
                  <p style={{ paddingLeft: 10, fontSize: 20, textAlign: 'center' }}>{getSentence(townShip["township_score"], townShip["townshipName"])}</p>
                </Paper>
              </Grid>
            </Grid>
          </>
        )
      }
    </>
  );
};

export default Footer;
