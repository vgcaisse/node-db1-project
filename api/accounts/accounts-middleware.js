const Account =  require('./accounts-model')

const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body
  if(name === undefined || budget === undefined) {
    res.status(400).json({ message: `name and budget are required`})
    next()
  } else if (typeof name !== 'string') {
    res.status(400).json({ message: `name's a lil wonky dontcha think`})
    next()
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: `name of account must be between 3 and 100`})
    next()
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    res.status(400).json({ message: `budget of account must be a number`})
    next()
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: `budget of account is too large or too small`})
    next()
  }
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