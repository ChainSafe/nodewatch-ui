/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React from "react"
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet"
import { LatLngBoundsExpression, LatLngTuple } from "leaflet"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { useEth2CrawlerApi } from "../../../Contexts/Eth2CrawlerContext"
import useWindowDimensions from "../../../utilHooks/useWindowDimensions"

const useStyles = makeStyles(() => {
  return createStyles({
    mapContainer: {
      height: "100%",
      width: "100%",
    },
    mapContainerDefined: {
      height: "inherit",
      width: "100%",
    },
  })
})

// attribution to put on map
// const tilesAttribution =
//   "Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://creativecommons.org/licenses/by-sa/3.0'>CC BY SA</a>."

// tiles source
// const accessToken = "W4rWKMx2iiIF8SZAOjfFnuk4khsAjJJ2iwdTI8pKy4yN58BJHP02SiwIwVABnEmZ"
// const tileUrl = `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${accessToken}`

const tileUrl = "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"

const NodeMap = ({ rootClassName }: { rootClassName: string }) => {
  const classes = useStyles()
  const { heatmap } = useEth2CrawlerApi()
  const { width } = useWindowDimensions()

  const latLngCenter: LatLngTuple = [30, 30]
  const latLngBounds: LatLngBoundsExpression = [
    [-70.095513, -140.0225067],
    [86.120628, 170.31769],
  ]
  const maxZoom = 4
  const defaultZoom = width < 480 ? 1 : width < 720 ? 1 : width < 1280 ? 1.4 : 1.4
  const minZoom = width < 480 ? 0.3 : width < 720 ? 1 : width < 1280 ? 1.4 : 1.4
  const circleRadius = width < 480 ? 1 : width < 720 ? 2 : width < 1280 ? 4 : 4
  const circleOpacity = 0.3

  return (
    <div className={rootClassName}>
      <MapContainer
        center={latLngCenter}
        maxBounds={latLngBounds}
        zoomControl={true}
        zoom={defaultZoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        className={classes.mapContainerDefined}
        attributionControl={false}
        // preferCanvas={true}
      >
        <TileLayer url={tileUrl} />
        {heatmap.map((heatmapPoint, i) => (
          <CircleMarker
            key={i}
            center={[heatmapPoint.latitude, heatmapPoint.longitude]}
            radius={circleRadius}
            fillOpacity={circleOpacity}
            stroke={false}
          >
            <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
              <span>{`${heatmapPoint.clientType} : ${heatmapPoint.networkType}`}</span>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}

export default NodeMap
