import { IConstants } from "@chainsafe/common-theme"

export const UI_CONSTANTS = {
  mobileButtonHeight: 44,
  headerHeight: 60,
  navWidth: 8 * 27,
  contentPadding: 8 * 15,
  contentTopPadding: 8 * 15,
  mobileHeaderHeight: 8 * 6.3,
  svgWidth: 8 * 2.5,
  topPadding: 8 * 3,
  mobileNavWidth: 8 * 30,
  headerTopPadding: 8 * 3,
  accountControlsPadding: 8 * 7,
}

export interface EcColors extends IConstants {
  chartPrimaryColors: {
    main: string
    light: string
    dark: string
  }
  chartColors: {
    color1: string
    color2: string
    color3: string
    color4: string
    color5: string
  }
}
