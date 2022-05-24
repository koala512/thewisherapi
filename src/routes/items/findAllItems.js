const { Models } = require('../../db/sequelize')
  
module.exports = (app) => {
  app.get('/lists', (req, res) => {
    Models.list.findAll({where: {userId: req.user.id}})
      .then(items => {
        const message = 'Tous les items ont été récupérées avec succès !'
        res.json({ message, data: items})
      })
      .catch(error => {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des items', error })
      })
  })
}