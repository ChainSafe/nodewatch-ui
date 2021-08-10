/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { ThemeSwitcher } from "@chainsafe/common-theme"
import { Router } from "@chainsafe/common-components"
import { theme } from "./Components/Themes/theme"
import { Eth2CrawlerProvider } from "./Contexts/Eth2CrawlerContext"
import BodyLayout from "./Components/Layouts/BodyLayout"
import Routes from "./Routes"
function App() {
  return (
    <ThemeSwitcher storageKey="eth2.themeKey" themes={{ light: theme }}>
      <Eth2CrawlerProvider>
        <BodyLayout>
          <Router>
            <Routes/>
          </Router>
        </BodyLayout>
      </Eth2CrawlerProvider>
    </ThemeSwitcher>
  )
}

export default App
