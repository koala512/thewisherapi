const {User,List } = require('../../../models');
const auth = require('../../auth/auth')

module.exports = (app) => {
    
    app.put('/list/:uuid/:listId', auth, (req, res) => {
        //update one list of an user
        User.findOne({ where: { uuid: req.params.uuid } })
                .then(user => {
                    List.findOne({ where: { id: req.params.listId, userId: user.id } })
                    .then(list => {
                        list.update(req.body)
                        .then(() => {
                            res.json({ message: 'Liste modifiée', data: list })
                        })
                        .catch(error => {
                            const message = `La liste n'a pas pu être modifiée. Réessayez dans quelques instants.`
                            res.status(500).json({ message, data: error })
                        })
                    })
                    .catch(error => {
                        const message = `La liste n'a pas pu être trouvée. Réessayez dans quelques instants.`
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