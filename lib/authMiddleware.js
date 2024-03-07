exports.isAuth = (req, res, next) => {
    if(!req.isAuthenticated()) {
        res.render('access-denied', {
            title: 'Access denied',
            message: 'You need to be signed in to join.',
        });
    }
    next();
}

exports.isMember = (req,res,next) => {
    if(!(req.isAuthenticated() && req.user.isMember)) {
        res.render('access-denied', {
            title: 'Access denied',
            message: 'You need to be a member to join.',
        });
    }
    next();
}

exports.isAdmin = (req,res,next) => {
    if(!(req.isAuthenticated() && req.user.isMember && req.user.isAdmin)) {
        res.render('access-denied', {
            title: 'Access denied',
            message: 'You need to be an admin to do that.',
        });
    } 
    next();
};