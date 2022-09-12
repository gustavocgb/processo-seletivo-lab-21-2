async function auth(req, res) {
    //res.redirect('/');
    res.send('token successfully validated');
};


module.exports = { auth };


/*async function authUser(req, res) {
    res.send("Hello User");
};

async function authAdmin(req, res) {
    res.send("Hello Admin");
};*/

// module.exports = { authUser, authAdmin };