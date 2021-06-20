let express = require('express');
let router = express.Router();
let indexController= require('../controllers/index');
let ListController= require('../controllers/contacts');


/* GET home page. */

router.get('/',indexController.displayHomePage);


router.get('/Home',indexController.displayHomePage);

router.get('/about',indexController.displayAboutPage);

router.get('/Projects',indexController.displayProjectsPage);

router.get('/Services',indexController.displayServicesPage);


router.get('/Contact',indexController.displayContactPage);
 

/* Routes for login page */
router.get('/login',indexController.displayLoginPage);
 

router.post('/login',indexController.processLoginPage);


router.get('/register',indexController.displayRegisterPAge);
 


router.post('/register',indexController.processingRegisterPage);



router.get('/logout',indexController.performLogout);

module.exports = router;
