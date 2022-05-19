const { Router } = require('express');

const router = Router();

const listController = require ('./controllers/listController');
const itemController = require ('./controllers/itemController')
const sessionValidator = require('../services/sessionValidator');
const authController = require('./controllers/authController');
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
router.post('/lists',validateToken ,listController.creatList);

// Update a list into lists
router.put('/lists/:listId(\\d+)',validateToken ,listController.updateList);

//Delete a list from the database by his id
router.get('/list/delete/:listId(\\d+)',validateToken,listController.deleteList);


// Items
// Create an item to a list
router.post('/list/:listId(\\d+)',validateToken , itemController.creatItem);
// Update an item from a list
router.put('/list/:listId(\\d+)/item/:itemId(\\d+)',validateToken ,itemController.updateItem);
// Delete an item from a list
router.get('/list/:listId(\\d+)/item/:itemId(\\d+)/delete' ,validateToken,itemController.deleteItem);



module.exports = router;
