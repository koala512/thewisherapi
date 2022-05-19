//This function checks if the user is correctly connected
const sessionValidator = {
    checkSession:(req,res,next)=> {
        if (typeof req.session.userData === 'undefined') {
            res.json("Merci d'initier l'application en vous rendant sur http://localhost:");
        } else {
            next();
        }
    
    }
}
module.exports = sessionValidator;