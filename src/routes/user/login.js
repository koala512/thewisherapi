const { User } = require('../../../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const privateKey = require('../../auth/private_key')

module.exports = (app) => {
  app.post('/login', (req, res) => {
    
    User.findOne({ where: { email: req.body.email } }).then(user => {

      if(!user) {
        const message = `L'utilisateur demandé n'existe pas.`
        return res.status(404).json({ message })
      }
      //check if password is correct
      return bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `Le mot de passe est incorrect.`
          return res.status(401).json({message})
        }

        // Generate token for 24h
        const token = jwt.sign(
          { userId: user.id },
          privateKey,
          { expiresIn: '24h' }
        );

        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user, token })
      })
    })
    .catch(error => {
      const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}