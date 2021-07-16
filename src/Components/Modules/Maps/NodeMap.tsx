import React from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import { LatLngBoundsExpression, LatLngTuple } from "leaflet"
import NodeIcon from "./NodeIcon"
import { nodeLocations } from "../../../dummyData/mapData"
import { createStyles, makeStyles } from "@chainsafe/common-theme"

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
const tileUrl = "http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png"

const latLngCenter: LatLngTuple = [40, 30]
const latLngBounds: LatLngBoundsExpression = [
  [-65.095513, -168.0225067],
  [88.120628, 190.31769],
]
const defaultZoom = 1.25
const minZoom = 1.25
const maxZoom = 3

const NodeMap = ({ rootClassName }: { rootClassName: string }) => {
  const classes = useStyles()

  return (
    <div className={rootClassName}>
      <MapContainer
        center={latLngCenter}
        maxBounds={latLngBounds}
        zoomControl={false}
        zoom={defaultZoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        className={classes.mapContainerDefined}
        attributionControl={false}
      >
        <TileLayer url={tileUrl} />
        {nodeLocations.map((nodeLocation, i) => (
          <NodeIcon key={i} {...nodeLocation} />
        ))}
      </MapContainer>
    </div>
  )
}

export default NodeMap
