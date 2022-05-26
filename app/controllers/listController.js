const List = require('../models/list');
const Item =require('../models/item');
const User =require ('../models/user');

const listSchema = require('../schemas/list');
const { creatItem } = require('./itemController');

const listController = {

    allLists: async (req, res) => {
       
        try {const user= req.decoded;
           const theLists = await List.findAll(user.userId);
            res.json(theLists);
        } catch (error) {
            res.status(500).json(error.stack + 'Erreur interne du serveur');
        }       
    },

    // GET /list/:listId
    oneList: async (req, res) => {

        const user= req.decoded
        const  paramId   = req.params;

        const { id } = {"id":paramId.listId}
        const oneList = await List.findOne(id);

        if ( oneList.user_id === user.userId) {

            if ("true" === req.query.withItems){
               try{ 
                    const items = await Item.findAllByListId(id)
                    oneList.items = items
                } catch (error) {
                    res.status(500).json(error.stack + 'Erreur interne du serveur');
                }
            } 
            res.json(oneList);  
        } else {
            res.status(404).json("The list selected doesn't exist");
        }
    },
    // POST /lists
    creatList: async (req, res) => {
        const user =req.decoded.userId;
        const list ={
            "title":req.body.title,
            "coment":req.body.coment,
            "user_id":user
        };
        if(user !== null){
        const newList = new List(list);
            try {
                await newList.save();
                res.json(newList);
            } catch (error) {
                res.status(500).send('Une erreur est surevnue');
            }
        } else {
            res.status(401).json("veuillez vous connecter")
        }
    },

    updateList: async (req,res) => {

        const user =req.decoded.userId;
        const  listId   = req.params;
        const paramId = parseInt(listId.id);
        const { id } = {"id":paramId};
        const updList = new List({...req.body, id});
       
            try {
                await updList.save();
                res.json(updList)

            } catch (error) {
                //console.log(error)
                res.status(500).send('Une erreur est surevnue');
            }
    },

    deleteList:async (req,res)=> {

        const user =req.decoded;
        const userId = user.userId;
        const  paramId   = req.params;
        const { id } = {"id":parseInt(paramId.listId)}
        console.log(id , "id");
        const delList = await List.findOne(id);
        console.log(delList);
       
        if (delList.user_id === userId){
            if (delList) { 
                try {
                    const deleteList = await delList.delete(id);
                    console.log(deleteList);
                    res.status(200).json("The list has been deleted");  
            
                } catch (error) {
                res.status(500).json(error.stack + 'Erreur interne du serveur');
                }
            
            } else {
                res.status(404).json("The list selected doesn't exist");
            }
        } else {
            res.status(401).json("The list selected isn't yours");
        }
    },
};

module.exports = listController;