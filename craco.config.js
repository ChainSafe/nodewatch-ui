/* eslint-disable no-undef */
const path = require("path")
const fs = require("fs")

const cracoBabelLoader = require("craco-babel-loader")

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

// react-leaflet requires custom inclusion through babel
module.exports = {
  plugins: [
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [resolveApp("node_modules/@react-leaflet"), resolveApp("node_modules/react-leaflet")],
      },
    },
  ],
}
