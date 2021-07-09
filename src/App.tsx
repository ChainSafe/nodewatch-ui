import React from "react"
import HomePage from "./Components/Pages/HomePage"
import { ThemeProvider } from "@chainsafe/common-theme"
import { theme } from "./assets/themes/theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  )
}

export default App
