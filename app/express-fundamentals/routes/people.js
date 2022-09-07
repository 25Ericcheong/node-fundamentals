const express = require('express')
const router = express.Router();

const {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
} = require('../controllers/people')

// refer back to app.js and look at base path created for this which is /api/people
// first way of setting up routes
// router.get('/', getPeople)
// router.post('/', createPerson)
// router.put('/:id', updatePerson)
// router.delete('/:id', deletePerson)

// can be chained if path is the same
router.route('/').get(getPeople).post(createPerson)
router.route('/:id').put(updatePerson).delete(deletePerson)


module.exports = router
