import React from "react"
import HomePage from "./Components/Pages/HomePage"
import { ThemeSwitcher } from "@chainsafe/common-theme"
import { theme } from "./assets/themes/theme"
import { Eth2CrawlerProvider } from "./Contexts/Eth2CrawlerContext"
import BodyLayout from "./Components/Layouts/BodyLayout"

function App() {
  return (
    <ThemeSwitcher storageKey="eth2.themeKey" themes={{ light: theme }}>
      <Eth2CrawlerProvider>
        <BodyLayout>
          <HomePage />
        </BodyLayout>
      </Eth2CrawlerProvider>
    </ThemeSwitcher>
  )
}

export default App
