import React from "react"
import { Marker, Tooltip } from "react-leaflet"
import L from "leaflet"
import { createStyles, makeStyles } from "@chainsafe/common-theme"
import clsx from "clsx"
import { NodeInfo } from "../../../../types/main"

interface StyleProps {
  weight: number
}

const useStyles = makeStyles(() => {
  return createStyles({
    mapIcon: ({ weight }: StyleProps) => ({
      height: `${weight * 0.2}px !important`,
      width: `${weight * 0.2}px !important`,
      borderRadius: "50%",
      border: "1px solid #808080",
    }),
    default: {
      backgroundColor: "#ffdd59",
    },
    geth: {
      backgroundColor: "#ff3f34",
    },
    parity: {
      backgroundColor: "#ffdd59",
    },
    ethereumjs: {
      backgroundColor: "violet",
    },
    getc: {
      backgroundColor: "#33c659",
    },
    nethermind: {
      backgroundColor: "#3047ed",
    },
    multigeth: {
      backgroundColor: "#a557f5",
    },
  })
})

interface IProps extends NodeInfo {}

const NodeIcon = ({ name, weight, client, coordinates }: IProps) => {
  const classes = useStyles({ weight })

  const iconStyle = L.divIcon({ className: clsx(classes[client], classes.mapIcon) })

  return (
    <Marker position={coordinates} icon={iconStyle}>
      <Tooltip>{name}</Tooltip>
    </Marker>
  )
}

export default NodeIcon
