import  React from 'react';
import {
  Grid,
  Paper,
} from '@material-ui/core';

import {
  DescriptionOutlined,
  InfoOutlined,
  SettingsInputAntennaOutlined,
  TouchAppOutlined
} from '@material-ui/icons';

import { useTheme } from '@material-ui/core/styles';

import './Header.css';
import { purple } from '@material-ui/core/colors';

const Header = () => {
  const theme = useTheme();
  const iconSize = 70
  const verticalMargin = "20px"
  console.log(theme.palette)
  return (
    <>
      <Paper elevation={5} style= {{backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText}}>
        <div style={{paddingLeft: '20px'}} >
          <p>Bienvenue sur le site de recherche d'indice de fragilité numérique communal !</p>
          <p>Qu'est ce que l'indice fragilité numérique ?
            C'est tout simplement un indicateur qui permet de classer les communes Françaises (DOM incluses) en fonction de leur "fragilité numérique" en combinant de multiple critères d'évaluation. Ceci permet au gouvernement, hommes politiques, statisticiens et vous-même de consulter l'indice de votre commune afin de la comparer à ses proches (et potentiellement savoir où dépenser de l'argent pour améliorer la situation nationale).
          </p>
          <p>
            Cet indice de fragilité est défini grâce à quatres axes:
          </p>
        </div>
      </Paper>
      <Grid container spacing={3} style={{marginTop: verticalMargin}}>
        <Grid item xs>
          <Paper elevation={5} style={{backgroundColor: theme.palette.tertiary.main}}>
            <Grid container spacing={3}>
              <Grid item xs={2} style={{textAlign: 'center'}}>
                <InfoOutlined style={{color: theme.palette.primary.main, fontSize: iconSize}} />
              </Grid>
              <Grid item xs={8}>
                <p>
                  <b>Accès à l'information</b>
                </p>
                Identifier des territoires <b>mal couverts par une offre</b> de service d'information ou des populations qui auront des <b>difficultés à comprendre l'information</b>.
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper elevation={5} style={{backgroundColor: theme.palette.secondary.main}}>
            <Grid container spacing={3}>
              <Grid item xs={2} style={{textAlign: 'center'}}>
                <SettingsInputAntennaOutlined style={{color: theme.palette.primary.main, fontSize: iconSize}} />
              </Grid>
              <Grid item xs={8}>
                <p>
                  <b>Accès aux interfaces numériques</b>
                </p>
                Identifier des territoires <b>mal couverts par les réseaux</b> ou dans lesquels des populations auront des <b>difficultés financières</b> à y accéder.
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{marginTop: verticalMargin}}>
        <Grid item xs>
          <Paper elevation={5} style={{backgroundColor: theme.palette.accentOne.main}}>
            <Grid container spacing={3}>
              <Grid item xs={2} style={{textAlign: 'center'}}>
                <DescriptionOutlined style={{ color: theme.palette.primary.main, fontSize: iconSize}} />
              </Grid>
              <Grid item xs={8}>
                <p>
                  <b>Compétences administratives</b>
                </p>
                Identifier des populations parmi lesquelles s'observent des difficultés à accomplir des <b>procédures administratives</b>.
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper elevation={5} style={{backgroundColor: theme.palette.accentTwo.main}}>
            <Grid container spacing={3}>
              <Grid item xs={2} style={{textAlign: 'center'}}>
                <TouchAppOutlined style={{color: theme.palette.primary.main, fontSize: iconSize}} />
              </Grid>
              <Grid item xs={8}>
                <p>
                  <b>Capacité d'usage des interfaces numériques</b>
                </p>
                Identifier des populations parmi lesquelles s'observe une <b>fréquence d'illectronisme</b> ou <b>difficulté à utiliser internet</b>.
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
