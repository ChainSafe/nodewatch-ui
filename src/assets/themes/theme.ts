import { createTheme } from "@chainsafe/common-theme"
import { EcColors, UI_CONSTANTS } from "./Constants"

export const theme = createTheme<EcColors>({
  themeConfig: {
    palette: {
      primary: {
        main: "#3552BF",
        hover: "2E00B0",
        background: "rgb(53, 82, 191, 0.1)",
      },
    },
    constants: {
      ...UI_CONSTANTS,
      ...({
        chartPrimaryColors: {
          main: "#3552BF",
          light: "2E00B0",
          dark: "#000000",
        },
        chartColors: {
          color1: "#0C1D7C",
          color2: "#3349C5",
          color3: "#566BDF",
          color4: "#B7C1FC",
          color5: "#EBEEFF",
        },
      } as EcColors),
    },
  },
})
