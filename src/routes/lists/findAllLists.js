const { Models } = require('../../db/sequelize')
  
module.exports = (app) => {
  app.get('/lists', (req, res) => {
    Models.list.findAll({where: {userId: req.user.id}})
    //if lists are found with the id, we return the lists else we return an error
        .then(lists => {
            if (lists) {
                const message = 'Les listes ont bien été trouvées.'
                res.json({ message, data: lists })
            } else {
                res.status(404).json({ message: 'Aucune liste trouvée' })
            }
        })
      .catch(error => {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des items', error })
      })
  })
}