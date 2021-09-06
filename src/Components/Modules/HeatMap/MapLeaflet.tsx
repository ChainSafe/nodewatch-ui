/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
import React, { useEffect } from "react"
// import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet"
import L, { LatLngTuple } from "leaflet"
// import { createStyles, makeStyles } from "@chainsafe/common-theme"
import { useEth2CrawlerApi } from "../../../Contexts/Eth2CrawlerContext"
// import useWindowDimensions from "../../../utilHooks/useWindowDimensions"
import "leaflet/dist/leaflet.css"
import "leaflet.heat"
import { useState } from "react"

// const useStyles = makeStyles(() => {
//   return createStyles({
//     mapContainer: {
//       height: "100%",
//       width: "100%",
//     },
//     mapContainerDefined: {
//       height: "inherit",
//       width: "100%",
//     },
//   })
// })

// attribution to put on map
// const tilesAttribution =
//   "Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://creativecommons.org/licenses/by-sa/3.0'>CC BY SA</a>."

// tiles source
// const accessToken = "W4rWKMx2iiIF8SZAOjfFnuk4khsAjJJ2iwdTI8pKy4yN58BJHP02SiwIwVABnEmZ"
// const tileUrl = `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${accessToken}`

// const tileUrl = "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"

const latLngCenter: LatLngTuple = [30, 0]
// const latLngBounds: LatLngBoundsExpression = [
//   [-70.095513, -140.0225067],
//   [86.120628, 170.31769],
// ]
const maxZoom = 5
const defaultZoom = 1.4
const minZoom = 1.4

const NodeMap = ({ rootClassName }: { rootClassName: string }) => {
  // const classes = useStyles()
  const { heatmap } = useEth2CrawlerApi()
  // const { width } = useWindowDimensions()

  // const circleRadius = width < 480 ? 1 : width < 720 ? 2 : width < 1280 ? 4 : 4
  // const circleOpacity = 0.3

  const [map, setMap] = useState<any>(undefined)
  const [radius, setRadius] = useState(3)

  useEffect(() => {
    if (!map) {
      const newMap = L.map("map", {
        zoomControl: true,
        minZoom: minZoom,
        maxZoom: maxZoom,
        // maxBounds: latLngBounds,
        attributionControl: false,
      }).setView(latLngCenter, defaultZoom)

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png").addTo(
        newMap
      )
      newMap.on("zoomend", function(results: any) {
        if (results.target._zoom > 4) {
          setRadius(5)
        } else if (results.target._zoom > 3) {
          setRadius(4)
        } else {
          setRadius(3)
        }
      });
      setMap(newMap)
    }
  }, [map])

  useEffect(() => {
    if (map) {
      const points: any[] = heatmap
        ? heatmap.map((p) => {
            return [p.latitude, p.longitude]
          })
        : []

        // removing previous layer
        let heatlayer: any = undefined;
        map.eachLayer((layer: any) => {
          if(layer?.options?.radius) {
            heatlayer = layer
          }
        })
        if (heatlayer) {
          map.removeLayer(heatlayer)
        }

        ;(L as any)
        .heatLayer(points, {
          minOpacity: 1,
          radius: radius,
          max: 1,
          blur: 5,
        })
        .addTo(map)
    }
  }, [heatmap, map, radius])

  return <div id="map" className={rootClassName}></div>

  // pure react leaflet map
  // in case we need it later

  // return (
  //   <div className={rootClassName}>
  //     <MapContainer
  //       center={latLngCenter}
  //       maxBounds={latLngBounds}
  //       zoomControl={true}
  //       zoom={defaultZoom}
  //       minZoom={minZoom}
  //       maxZoom={maxZoom}
  //       className={classes.mapContainerDefined}
  //       attributionControl={false}
  //       // preferCanvas={true}
  //     >
  //       <TileLayer url={tileUrl} />
  //       {heatmap.map((heatmapPoint, i) => (
  //         <CircleMarker
  //           key={i}
  //           center={[heatmapPoint.latitude, heatmapPoint.longitude]}
  //           radius={circleRadius}
  //           fillOpacity={circleOpacity}
  //           stroke={false}
  //         >
  //           <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
  //             <span>{`${heatmapPoint.clientType} : ${heatmapPoint.networkType}`}</span>
  //           </Tooltip>
  //         </CircleMarker>
  //       ))}
  //     </MapContainer>
  //   </div>
  // )
}

export default NodeMap
