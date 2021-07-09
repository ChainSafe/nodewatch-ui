import React from "react"
import HomePage from "./Components/Pages/HomePage"
import { ThemeProvider } from "@chainsafe/common-theme"
import { theme } from "./assets/themes/theme"
import { Eth2CrawlerProvider } from "./Contexts/Eth2CrawlerData"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Eth2CrawlerProvider>
        <HomePage />
      </Eth2CrawlerProvider>
    </ThemeProvider>
  )
}

export default App
