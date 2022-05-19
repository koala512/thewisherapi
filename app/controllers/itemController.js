const Item = require('../models/item');
const urlMetadata = require('url-metadata');

const itemController = {
   
    
    allItems: async (req, res) => {

        try {const theItems = await List.findAll();

            res.json(theItems);

        } catch (error) {

            res.status(500).json(error.stack + 'Erreur interne du serveur');
        }       
    },
    
    // Route /list/:listId(\\d+)
    creatItem: async (req, res) => {

      
        const image = await urlMetadata(req.body.url).then(
          function (metadata) { // success handler
            const img = metadata["og:image"];
            return img
          },
          function (error) { // failure handler
            console.log(error)
          });
          

        const  paramId   = req.params;
        const { id } = {"id":parseInt(paramId.listId)}
        const item ={ 
            "title":req.body.title,
            "url":req.body.url,
            "coment":req.body.coment,
            "list_id":id,
            "image_url":image
         };
        let newArticle = new Item(item);
       // console.log(item ,'contenu dans item');
        
        try {
             await newArticle.save();
             res.json(newArticle);
        } catch (err) {
            res.status(500).json(err.message);
        }
       

    },
    // Route: /list/:listId(\\d+)
    updateItem: async (req,res) => {

        const image = await urlMetadata(req.body.url).then(
            function (metadata) { // success handler
              const img = metadata["og:image"];
              return img
            },
            function (error) { // failure handler
              console.log(error)
            });

        const  allId   = req.params;
        const  itemId  = parseInt(allId.itemId);
        const item ={ 
            "id":itemId,
            "title":req.body.title,
            "url":req.body.url,
            "coment":req.body.coment,
            "image_url":image
        };      
        //console.log(item, "contenu de item dans item controller");       
        const updItem = new Item(item)
            
            try {
                await updItem.save();
                res.json(updItem)

            } catch (error) {
               // console.log(error)
                res.status(500).send('Une erreur est surevnue');
            }
        

    },
    // Route: /list/:listId(\\d+)/item/:itemId(\\d+)/delete
    deleteItem:async (req,res) =>{

        const  allId   = req.params;
        const itemId = parseInt(allId.itemId);
       // console.log(allId, " allId");
       // console.log(itemId, " itemId");
        const delItem = await Item.findOne(itemId);
       
        if (itemId) { 
            try {
                 await delItem.delete(itemId);
            res.status(200).json("The item as been delete");  
            
             } catch (error) {
            res.status(500).json(error.stack + 'Erreur interne du serveur');
            }
            
        } else {
            res.status(404).json("The list selected doesn't exist");
        }
    }


};

module.exports = itemController;