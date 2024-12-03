export const validateMessageSequence = (node) => {
  if (!node.data.payload || node.data.payload.length === 0) {
    return Promise.reject()
  }

  return Promise.resolve()
}

export const validateDateTime = (node) => {
  const times = node.data?.times || []
  const incompleteDays = times.some((time) => !time.startTime || !time.endTime)

  if (times.length !== 7 || incompleteDays) {
    return Promise.reject()
  }

  return Promise.resolve()
}

export const validateAddComment = (node) => {
  if (!node.data.comment) return Promise.reject()

  return Promise.resolve()
}
