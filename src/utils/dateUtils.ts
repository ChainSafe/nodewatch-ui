/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
export const getUnixTimeStampFromDaysBefore = (noOfDays: number) => {
  const date = new Date()
  date.setDate(date.getDate() - noOfDays)
  return Math.round(date.getTime() / 1000)
}

export const getUnixTimeStampCurrent = () => {
  return Math.round(new Date().getTime() / 1000)
}
