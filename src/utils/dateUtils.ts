/*
Copyright 2021 ChainSafe Systems
SPDX-License-Identifier: LGPL-3.0-only
*/
export const getTimeStampFromDaysBefore = (noOfDays: number) => {
  const date = new Date()
  date.setDate(date.getDate() - noOfDays)
  return date.getTime()
}
