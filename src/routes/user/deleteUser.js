const { User } = require('../../../models');
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.delete('/user/:uuid',auth, (req, res) => {
        //delete one user
        User.destroy({ where: { uuid: req.params.uuid } })
            .then(user => {
                const message = `L'utilisateur a été supprimé avec succès`;
                res.json({ message, data: user })
            })
            .catch(error => {
                const message = `L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
            })
    })
}