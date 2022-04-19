const Account =  require('./accounts-model')
const db = require('../../data/db-config')
const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body
  if(name === undefined || budget === undefined) {
    res.status(400).json({ 
      message: `name and budget are required`
    })
  } else if (typeof name !== 'string') {
    res.status(400).json({ 
      message: `name's a lil wonky dontcha think`})
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ 
      message: `name of account must be between 3 and 100`
    })
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    res.status(400).json({ 
      message: `budget of account must be a number`
    })
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ 
      message: `budget of account is too large or too small`})
  } else if (res.status(400)) {
    next()
  }
}

const checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const existing = await db('accounts') 
      .where('name', req.body.name.trim())
      .first()

      if(existing) {
        next({ status: 400, message: `that name is taken` })
      } else {
        next()
      }
  } catch (err) {
    next(err)
  }
}

const checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  Account.getById(req.params.id)
    .then(accounts => {
      if(!accounts) {
        next({ status: 404, message: `account not found` })
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