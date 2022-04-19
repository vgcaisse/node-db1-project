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
  Account.getById(req.params.id)
    .then(accounts => {
      res.json(accounts)
    })
    .catch(err => {
      next(err)
    })
})

router.post(
  '/',
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
  })

router.put(
  '/:id',
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
  });

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
