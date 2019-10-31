let auth = require('../controllers/auth');

//checking whether the user is authorized to have access to the admin page.
function checkAuth(req, res, next) {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
        next(); //next func will be executed
    }else{
        res.status(400);
        res.send('Not authorized!');
    }
}

module.exports = checkAuth;