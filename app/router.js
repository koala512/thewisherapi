const { Router } = require('express');

const router = Router();

const listSchema = require('./schemas/list');
const itemSchema = require('./schemas/item')

const { validateBody } = require('../services/validator');


const listController = require ('./controllers/listController');
const itemController = require ('./controllers/itemController')
const sessionValidator = require('../services/sessionValidator');
const authController = require('./controllers/authController');
const { login } = require('./controllers/authController');
const { validateToken } = require('../utils');


/**
 * Returns home page
 * @route GET /
 */

router.get('/', (req, res, next) => {
    res.json('hello');
});


//router.use(sessionValidator.checkSession);
router.post('/user', authController.add)

router.post('/login', authController.login)
/**
 * Returns all lists from the database
 * @route GET /list
 * @group Lists
 * @returns {Array<List>} 200 - An array of lists
 */

 router.get('/lists',validateToken, listController.allLists);

/**
 * Returns a list from the database with his id
 * @route GET /list/{id}
 * @group Lists
 * @param {number} id.path.required - the id to get the correct list
 * @returns {List.model} 200 - The list
 * @returns {string} 404
 */
 router.get('/list/:listId(\\d+)',validateToken, listController.oneList);

// Add a list into lists
router.post('/lists',validateToken, validateBody(listSchema) ,listController.creatList);

// Update a list into lists
router.put('/lists/:listId(\\d+)',validateToken, validateBody(listSchema) ,listController.updateList);

//Delete a list from the database by his id
router.get('/list/delete/:listId(\\d+)',validateToken,listController.deleteList);
/**
 * Returns some list from the database based on the item id
 * @route GET /lists/items/{iid}
 * @group Lists
 * @param {number} iid.path.required - the item id
 * @returns {Array<List>} 200 - An array of List, can be empty
 */
// router.get('/lists/item/:id(\\d+)', listController.byItem);

//  router.get('/lists/:id(\\d+)', listController.oneList);


/**
 * Returns all items from the database
 * @route GET /items
 * @group Items

 * @returns {Array<Items>} 200 - An array of items
 */
//  router.get('/items', itemController.allItems);

 // ici, idéalement, notre validateur, pour qu'il soit un tant soit peu universel, va devoir connaître le schéma à utiliser pour valider les données
// on va donc imaginer une fonction qui prend le schéma en param et retourne... un middleware qui valide le body
// router.post('/lists', validateBody(listSchema), flush, listController.newList);
/** 
 * @returns {Array<Items>} 200 - An array of Item
 */
//  router.get('/items', itemController.allItems);

 // ici, idéalement, notre validateur, pour qu'il soit un tant soit peu universel, va devoir connaître le schéma à utiliser pour valider les données
// on va donc imaginer une fonction qui prend le schéma en param et retourne... un middleware qui valide le body


// Items
// Create an item to a list
router.post('/list/:listId(\\d+)',validateToken ,validateBody(itemSchema), itemController.creatItem);
// Update an item from a list
router.put('/list/:listId(\\d+)/item/:itemId(\\d+)',validateToken, validateBody(itemSchema) ,itemController.updateItem);
// Delete an item from a list
router.get('/list/:listId(\\d+)/item/:itemId(\\d+)/delete' ,validateToken,itemController.deleteItem);



module.exports = router;
