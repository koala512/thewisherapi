const { User } = require('../../../models');
const bcrypt = require('bcrypt')
const auth = require('../../auth/auth')

module.exports = (app) => {
    //update one user 
    app.put('/user/:uuid',auth, (req, res) => {
        const { pseudo, email, password } = req.body;
        // hash password before saving it in the database
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