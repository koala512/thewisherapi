const { List,Item } = require('../../../models');
const urlMetadata = require('url-metadata');
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.put('/list/:listId/item/:itemId', auth, (req, res) => {
      //update an item of a list
        const { title, url, comment } = req.body;
        const paramsId = req.params.listId;
        const itemId = req.params.itemId;
        List.findOne({ where: { id: paramsId } })
        .then(list => {
            urlMetadata(url).then(
                function (metadata) { // success handler
                    const img = metadata["og:image"];
                    const item = {
                        title,
                        url,
                        comment,
                        listId: list.id,
                        image: img
                    };
                    Item.update(item, { where: { id: itemId } })
                        .then(item => {
                            const message = `L'item ${req.body.title} a bien été modifié.`
                            res.json({ message, data: item })
                        })
                        .catch(error => {
                            if (error instanceof ValidationError) {
                                return res.status(400).json({ message: error.message, data: error });
                            }
                            if (error instanceof UniqueConstraintError) {
                                return res.status(400).json({ message: 'error.message', data: error });
                            }
                            const message = `L'item n'a pas pu être modifié. Réessayez dans quelques instants.`
                            res.status(500).json({ message, data: error })
                        })
                },
                function (error) { // failure handler
                    console.log(error)
                }
            );
        })
        .catch(error => {
            const message = `La liste n'a pas pu être trouvée. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
            }
        )
    })
}