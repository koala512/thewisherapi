const { User,List } = require('../../../models');

const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.post('/list', auth, (req, res) => {

    const { uuid,title, comment } = req.body;
    User.findOne({ where: { uuid: uuid } })
    .then(user => {

    List.create({ title, comment, userId: user.id })
      .then(list => {
        const message = `La liste ${req.body.title} a bien été crée.`
        res.json({ message, data: list })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: 'error.message', data: error });
        }
        const message = `La liste n'a pas pu être ajoutée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
    .catch(error => {
        const message = `l'utilistaeur n'a pas pu être trouvé. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
        }
    )
    })
}