let Post = require('../models/posts').Post;
let path = require('path');
let uniqid = require('uniqid');
let express =  require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');


//Get posts from server
router.get('/', async (req,res) =>{
    let posts = await Post.find(); //find() func is async! 
    res.send(posts);
})

//Get post from server according to id 
router.get('/:id', async (req, resp) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    resp.send(post);
})

//Create post in DB
router.post('/', authMiddleware, async (req,res) =>{
    let reqBody = req.body;
    let imgPath;
    if(reqBody.imageUrl) {
        imgPath = reqBody.imageUrl;
    }else{
        //imgPath = req.file.path;
        imgPath = req.file.path.substring(req.file.path.indexOf(path.sep), req.file.path.length);
    }
//path.sep==>now the file separator will be chosen according to your operating system.
    let newPost = new Post({
        id: uniqid(), 
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
      //imageUrl: reqBody.imageUrl
       imageUrl: imgPath
    })
    //console.log(newPost);
    //console.log(req.file);
    await newPost.save(); //save func is async!
    res.send('Created!');
})

//Deleting post
router.delete('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
   await Post.deleteOne({id:id}); //deleteOne async func!
   res.send('Deleted!');
})

//Updating post
router.put('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
   await Post.updateOne({id:id}, req.body); //updateOne async func!
   res.send('Updated!');
})

module.exports = router;