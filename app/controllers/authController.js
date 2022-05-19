const User = require("../models/user");
const bcrypt = require('bcrypt');
const createToken = require ('../../utils').createToken


/**
 * 
 */
const authController = {

    async add(req,res) {

        try { 
                const userToCreate = await User.findOne(req.body.email)
                 if(userToCreate){
                    res.status(403).json("Acount already exist")
                    return 
                }
        }catch (err){
            res.status(500).json("Error no response from server")
        }

        try{
            const user = new User({
                pseudo : req.body.pseudo,
                email : req.body.email,
                password : req.body.password,
            })
           // console.log(user ," user avant la creation du token");
            let createUser = await user.save()
             //console.log(createUser, "createUser");
            delete createUser.password 
            
            createUser.token = createToken(createUser)
            res.status(201).send(createUser);
            //console.log(createUser.token ,"create user après avoir généré le token");

        }catch(err){
            res.status(500).json("error")
        }

    },
    async login(req,res) {

        //console.log(req.body,"req.body");
        try{
            const user = await User.findOne(req.body.email)
            const validate = await bcrypt.compare(req.body.password, user.password)
            //console.log(validate, " validate dans authcontroller");
            if(validate) {
                res.status(200).send({...user, token: createToken(user) })
            }
           // console.log(user , "dans login");
        }catch (err){
            res.status(500).json("error with response from server user")
        }
      
    }
};

module.exports = authController;