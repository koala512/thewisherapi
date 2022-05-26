const { List,Item } = require('../../../models');
const urlMetadata = require('url-metadata');
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.delete('/list/:listId/item/:itemId', auth, (req, res) => {
      //delete an item of a list
        const paramsId = req.params.listId;
        const itemId = req.params.itemId;
        Item.destroy({ where: { id: itemId } })
        .then(item => {
            const message = `L'item a bien été supprimé.`
            res.json({ message, data: item })
        }
        )
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: 'error.message', data: error });
            }
            const message = `L'item n'a pas pu être supprimé. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
        }
        )
    })
}