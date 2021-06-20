let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let List = require('../models/contacts');

let ListController= require('../controllers/contacts');
//helper function
function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();

}
 
router.get('/',ListController.displayContacList);
/* GET Route for  displaying Add page - Create Operation */
router.get('/add',requireAuth,ListController.displayAddPage);
 
/* POST Route for processing Add page - Create Operation */
router.post('/add',requireAuth,ListController.ProcessAddPage);

/* GET Route for displaying the Edit page - update Operation */
 
router.get('/edit/:id',requireAuth,ListController.getEditPage);
/* POST Route for processing the Edit page - update Operation */
router.post('/edit/:id',requireAuth,ListController.ProcessEditPage );

/* GET to perform Deletion - delete Operation */

router.get('/delete/:id',requireAuth, ListController.deletePage);
module.exports = router;