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
        main: "#3552BF",
        hover: "2E00B0",
        background: "rgb(53, 82, 191, 0.1)",
      },
    },
    constants: {
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
        chartSizes: {
          chartBoxHeight: 200,
          chartHeight: 160,
        },
      } as EcConstants),
    },
  },
})
