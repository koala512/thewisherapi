const { List,Item } = require('../../../models');
const urlMetadata = require('url-metadata');
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.post('/list/:listId', auth, (req, res) => {

    const { title, url, comment } = req.body;
    
    // get listId from url
    const paramsId = req.params.listId;
    List.findOne({ where: { id: paramsId } })
    .then(list => {
        //use urlMetadata to get image url
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
                console.log(item, 'item');
                Item.create(item)
                    .then(item => {
                        const message = `L'item ${req.body.title} a bien été crée.`
                        res.json({ message, data: item })
                    })
                    .catch(error => {
                        if (error instanceof ValidationError) {
                            return res.status(400).json({ message: error.message, data: error });
                        }
                        if (error instanceof UniqueConstraintError) {
                            return res.status(400).json({ message: 'error.message', data: error });
                        }
                        const message = `L'item n'a pas pu être ajouté. Réessayez dans quelques instants.`
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

        