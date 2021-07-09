import { createTheme } from "@chainsafe/common-theme"

export const theme = createTheme({
  themeConfig: {
    palette: {
      primary: {
        main: "#5165DC",
      },
    },
    constants: {
      headerHeight: 70,
    },
    typography: {
      h1: {
        fontSize: "72px",
        lineHeight: "80px",
      },
      h2: {
        fontSize: "48px",
        lineHeight: "56px",
      },
      h3: {
        fontSize: "30px",
        lineHeight: "38px",
      },
      h4: {
        fontSize: "24px",
        lineHeight: "28px",
      },
    },
  },
})
