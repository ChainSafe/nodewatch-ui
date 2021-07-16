import { createTheme } from "@chainsafe/common-theme"

export const theme = createTheme({
  themeConfig: {
    palette: {
      primary: {
        main: "#5165DC",
        background: "#5165DC",
        hover: "#5165DC",
      },
    },
    typography: {
      h1: {
        fontSize: "28px",
        lineHeight: "32px",
        marginBottom: "16px",
      },
      h2: {
        fontSize: "24px",
        lineHeight: "28px",
        marginBottom: "16px",
        fontWeight: "normal",
      },
      body1: {
        fontSize: "16px",
        lineHeight: "20px",
      },
    },
  },
})
