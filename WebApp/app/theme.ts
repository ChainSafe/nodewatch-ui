import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { fade } from '@material-ui/core';

export const appColors = {
  black: '#000000',
  controls:{

  }
}

export const brandColors = {
  default: {
    main: "#744eaa",
    secondary: "#81e4da"
  },
  portis: {
    primary: "#6db2d8"
  }
}

export const uiConstants = {
  headerHeight: 50,
  footerHeight: 40,
  pageMargin: 40,
  modal:{
    modalWidthMax: 640,
    borderThickness: 1,
    borderColor: fade(brandColors.default.main, 0.8)
  }
}

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "'Roboto'",
      "'sans-serif'"
    ].join(','),
  },
  palette: {
    type: 'light',
    background: {
      paper: '#ffffff',
      default: '#ffffff',
    },
    primary: {
      main: brandColors.default.main
    },
    secondary: {
      main: brandColors.default.main
    }
  },
  overrides:{
    MuiTypography:{
      h1:{
        fontSize: "3.5rem"
      },
      h2:{
        fontSize: "2rem"
      }
    }
  }

});

export default theme;
