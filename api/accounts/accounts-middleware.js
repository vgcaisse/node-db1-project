const Account =  require('./accounts-model')

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
  Account.getById(req.params.id)
    .then(accounts => {
      if(!accounts) {
        next({ status: 404, message: `imagine an office of monkeys losing their minds` })
      } else {
        req.accounts = accounts
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}


module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
}