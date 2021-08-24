/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import { createTheme } from "@chainsafe/common-theme"
import { EcConstants } from "./constants"

export const theme = createTheme<EcConstants>({
  themeConfig: {
    palette: {
      primary: {
        main: "#B7C1FC",
        hover: "#F9B189",
        background: "#131825",
      },
      secondary: {
        main: "#E4665C",
      },
      background: {
        default: "#131825",
        paper: "#424F60",
      },
      text: {
        primary: "#f6f6f6",
      },
    },
    constants: {
      ...({
        chartPrimaryColors: {
          main: "#566BDF",
          light: "2E00B0",
          dark: "#000000",
        },
        chartColors: {
          color1: "#566BDF",
          color2: "#10B981",
          color3: "#E4665C",
          color4: "#FFA113",
          color5: "#8C14EB",
        },
        statColors: {
          red: "#E4665C",
          blue: "#B7C1FC",
          green: "#10B981",
        },
        chartSizes: {
          chartBoxHeight: 300,
          chartHeight: 280,
        },
        headerHeight: 50,
      } as EcConstants),
    },
    overrides: {
      Typography: {
        h1: {
          fontSize: 48,
          lineHeight: "58px",
          fontStyle: "normal",
          fontWeight: "normal",
        },
        h2: {
          fontSize: "38.0413px",
          lineHeight: "45px",
          fontStyle: "normal",
          fontWeight: "normal",
        },
        h3: {
          fontSize: "22.3773px",
          lineHeight: "31px",
          fontStyle: "normal",
          fontWeight: "normal",
        },
        h4: {
          fontSize: 20,
          lineHeight: "28px",
          fontStyle: "normal",
          fontWeight: "normal",
        },
      },
    },
  },
})
