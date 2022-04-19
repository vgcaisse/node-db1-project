const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  next()
}

const checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  next()
}

const checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  next()
}


module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
}