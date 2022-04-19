const router = require('express').Router()
const Account = require('./accounts-model')

const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  // throw new Error('deez')
  // res.json([{},{}])
  Account.getAll()
    .then(accounts => {
      res.json(accounts)
    })
    .catch(err => {
      next(err)
    })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC

  // Account.getById(req.params.id)
  //   .then(accounts => {
  //     res.json(accounts)
  //   })
  //   .catch(err => {
  //     next(err)
  //   }) 
  res.json(req.accounts)
})

router.post(
  '/',
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    // DO YOUR MAGIC

    // Account.create(req.body)
    //   .then(newAccount => {
    //     res.status(201).json(newAccount)
    //   })
    //   .catch(err => {
    //     next(err)
    //   })
    try {
      const newAccount = await Account.create(req.body.trim())
      res.status(201).json(newAccount)
    } catch (err) {
      next(err)
    }
  })

router.put(
  '/:id',
  checkAccountId,
  checkAccountPayload,
  (req, res, next) => {
    // DO YOUR MAGIC
    Account.updateById(req.params.id, req.body)
    .then(updatedAcc => {
      res.json(updatedAcc);
    })
    .catch(next)
  });

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.deleteById(req.params.id)
    .then(()=> {
      res.json()
    })
    .catch(err => {
      next(err)
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
