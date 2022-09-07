const express = require('express')
const router = express.Router();

const {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
} = require('../controllers/people')

// refer back to app.js and look at base path created for this which is /api/people
router.get('/', getPeople)

router.post('/', createPerson)

router.put('/:id', updatePerson)

router.delete('/:id', deletePerson)

module.exports = router
