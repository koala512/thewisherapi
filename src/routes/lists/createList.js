const { Models } = require('../../db/sequelize')
  
module.exports = (app) => {
  app.post('/lists', (req, res) => {
    Models.list.create(req.body)
      .then(list => {
        const message = `La liste ${req.body.name} a bien été crée.`
        res.json({ message, data: list})
      })
  })
}