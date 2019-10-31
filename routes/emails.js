let Email = require('../models/emails').Email;
let uniqid = require('uniqid');
let express =  require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

//getting all emails from DB
router.get('/', authMiddleware, async (req,res) =>{
    res.send(await Email.find());
});

//Creating email in DB
router.post('/', async (req, res) =>{
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniqid(),
        name: reqBody.name,
        text: reqBody.text,
        email: reqBody.email,
        date: new Date()
    })
    await newEmail.save();
    res.send('Accepted!');
});

//Deleting email
router.delete('/:id', authMiddleware, async (req,res) =>{
    await Email.deleteOne({id: req.params.id});
    res.send('Deleted!');
});

module.exports = router;