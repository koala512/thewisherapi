const { Models } = require('../../db/sequelize')
  

module.exports = (app) => {
  app.get('/list/pokemons/:listId', (req, res) => {
    const  paramId   = req.params;
    const { id } = {"id":paramId.listId}
    Models.list.findByPk(id)
    //if a list is found with the id, we return the list else we return an error
        .then(list => {
            if (list) {
                const message = 'La liste a bien été trouvé.'
                res.json({ message, data: list })
            } else {
                res.status(404).json({ message: 'Aucune liste trouvée avec cet id' })
            }
        })
      .catch(error => {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la liste', error })
      })
  })
}