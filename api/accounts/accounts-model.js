const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  // SELECT * FROM accounts
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  // SELECT * FROM accounts WHERE id = 1
  return db('accounts')
    .where('id', id)
    .first()
}

const create = async account => {
  // DO YOUR MAGIC
  // return db('accounts')
  //   .insert(account)
  //   .then(([id]) => getById(id))
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
