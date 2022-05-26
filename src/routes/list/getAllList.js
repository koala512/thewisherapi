const { User,List } = require('../../../models');
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/list/:uuid', auth, (req, res) => {
    // get all lists from user
    User.findOne({ where: { uuid: req.params.uuid } })
    .then(user => {
        console.log(user, 'user');
        List.findAll({ where: { userId: user.id },order: ['updatedAt'], })
        .then(lists => {
            res.json({ message: 'Listes récupérées', data: lists })
        })
        .catch(error => {
            const message = `Les listes n'ont pas pu être récupérées. Réessayez dans quelques instants.`
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