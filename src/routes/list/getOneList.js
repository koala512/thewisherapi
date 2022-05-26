const {Item,User,List } = require('../../../models');
const auth = require('../../auth/auth')

module.exports = (app) => {
    
    app.get('/list/:uuid/:listId', auth, (req, res) => {
       //get one list from user with all items
         User.findOne({ where: { uuid: req.params.uuid } })
            .then(user => {
                List.findOne({ where: { id: req.params.listId, userId: user.id } })
                .then(list => {
                    Item.findAll({ where: { listId: list.id },order: ['updatedAt']})
                    .then(items => {
                        res.json({ message: 'Liste récupérée', data: { list, items } })
                    })
                    .catch(error => {
                        const message = `Les items de la liste n'ont pas pu être récupérées. Réessayez dans quelques instants.`
                        res.status(500).json({ message, data: error })
                    })
                })
                .catch(error => {
                    const message = `La liste n'a pas pu être récupérée. Réessayez dans quelques instants.`
                    res.status(500).json({ message, data: error })
                })
            })
            .catch(error => {
                const message = `L'utilisateur n'a pas pu être trouvé. Réessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
                }
            )
    })
}