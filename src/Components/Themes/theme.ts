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
        main: "#E4665C",
        hover: "#F9B189",
        background: "#131825",
      },
      background: {
        default: "#131825",
        paper: "#424F60"
      },
      text: {
        primary: "#f6f6f6" 
      }

    },
    constants: {
      ...({
        chartPrimaryColors: {
          main: "#3552BF",
          light: "2E00B0",
          dark: "#000000",
        },
        chartColors: {
          color1: "#CC444B",
          color2: "#E4665C",
          color3: "#DF7373",
          color4: "#F9B189",
          color5: "#FFDE8A",
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
          fontWeight: "normal"
        },
        h2: {
          fontSize: "38.0413px",
          lineHeight: "45px",
          fontStyle: "normal",
          fontWeight: "normal"
        },
        h3: {
          fontSize: "22.3773px",
          lineHeight: "31px",
          fontStyle: "normal",
          fontWeight: "normal"
        },
        h4: {
          fontSize: 20,
          lineHeight: "28px",
          fontStyle: "normal",
          fontWeight: "normal"
        }
      }
    }
  },
})
