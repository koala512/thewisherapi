const { User } = require('../../../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const privateKey = require('../../auth/private_key')

module.exports = (app) => {
    app.post('/user', (req, res) => {
        const { pseudo, email, password } = req.body;
        // const passwordHash = bcrypt.hashSync(password, 10);
        bcrypt.hash(password, 10)
            .then(hash => User.create({ pseudo, email, password: hash }))
            .catch(error => {
                const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
            })
            //set userId in a jwt
            .then(user => {
                const token = jwt.sign(
                    { userId: user.id },
                    privateKey,
                    { expiresIn: '24h' }
                );
                const message = `L'utilisateur a été connecté avec succès`;
                return res.json({ message, data: user, token })
            })
    })
}




        

