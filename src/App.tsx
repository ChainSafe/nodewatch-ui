/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import HomePage from "./Components/Pages/HomePage"
import { ThemeSwitcher, createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import { theme } from "./Components/Themes/theme"
import { Eth2CrawlerProvider } from "./Contexts/Eth2CrawlerContext"
import BodyLayout from "./Components/Layouts/BodyLayout"
import NavBar from "./Components/Modules/Navbar"
import Footer from "./Components/Modules/Footer"

const useStyles = makeStyles(
  ({palette}: ITheme) => {
    return createStyles({
      root: {
        background: palette.background.default,
      },
    })
  },
)
function App() {
  const classes = useStyles();
  return (
    <ThemeSwitcher storageKey="eth2.themeKey" themes={{light: theme}}>
      <Eth2CrawlerProvider>
        <div className={classes.root}>
          <NavBar/>
          <BodyLayout>
            <HomePage />
          </BodyLayout>
          <Footer/>
      </div>
      </Eth2CrawlerProvider>
    </ThemeSwitcher>
  )
}

export default App
