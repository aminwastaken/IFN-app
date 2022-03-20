import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

import {
  DescriptionOutlined,
  InfoOutlined,
  SettingsInputAntennaOutlined,
  TouchAppOutlined,
} from "@material-ui/icons";

import { useTheme } from "@material-ui/core/styles";

import "./Header.css";
import { purple } from "@material-ui/core/colors";

const Header = () => {
  const theme = useTheme();
  const iconSize = 70;
  const verticalMargin = "20px";
  console.log(theme.palette);
  return (
    <>
      <div>
        <div style={{ paddingLeft: "30px" }}>
          <Typography variant="h3" style={{ color: "#226653" }}>
            {" "}
            Calculateur de fragilité numerique
          </Typography>
          <p>
            L'indice de fragilité numérique, par sa représentation graphique,
            révèle les zones d'exclusion numérique sur un territoire donné. Cet
            outil permet, que vous soyez une commune, un département ou une
            région de comparer votre indice de fragilité numérique avec les
            autres territoires.
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
