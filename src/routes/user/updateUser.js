const { User } = require('../../../models');
const bcrypt = require('bcrypt')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.put('/user/:uuid',auth, (req, res) => {
        //update one user
        const { pseudo, email, password } = req.body;
        // const passwordHash = bcrypt.hashSync(password, 10);
        bcrypt.hash(password, 10)
            .then(hash => User.update({ pseudo, email, password: hash }, { where: { uuid: req.params.uuid } }))
            .catch(error => {
                const message = `L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
            }
            )
            .then(user => {
                const message = `L'utilisateur a été modifié avec succès`;
                res.json({ message, data: user })
            })
    })
}