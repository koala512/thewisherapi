const {User,List } = require('../../../models');
const auth = require('../../auth/auth')

module.exports = (app) => {
    
    app.delete('/list/:uuid/:listId', auth, (req, res) => {
        //delete one list of an user 
        User.findOne({ where: { uuid: req.params.uuid } })
              .then(user => {
                    List.findOne({ where: { id: req.params.listId, userId: user.id } })
                    .then(list => {
                        list.destroy()
                        .then(() => {
                            res.json({ message: 'Liste supprimée', data: list })
                        })
                        .catch(error => {
                            const message = `La liste n'a pas pu être supprimée. Réessayez dans quelques instants.`
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
           
