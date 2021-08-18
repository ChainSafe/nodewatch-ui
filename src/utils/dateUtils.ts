export const getTimeStampFromDaysBefore = (noOfDays: number) => {
  const date = new Date()
  date.setDate(date.getDate() - noOfDays)
  return date.getTime()
}
