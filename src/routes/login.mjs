import '../strategies/localStrategy.mjs';
import { Router } from 'express';
import passport from 'passport';

let loginRouter = Router();

loginRouter.post('/loginuser', passport.authenticate("local"), (req, res) => {
    
    req.session.isAuthenticated = true;
    req.session.email = req.user.email;

    req.session.save((err) => {
        if(err) {
            return res.status(500).json({ message: 'Could not save session'})
        }
        res.status(200).json({ user: req.user});
    })
})

loginRouter.get('/loginuser/status', (req, res) => {
  
    if(req.user) {
        let data = req.user;
        return res.json({user: data});
    }

    return res.status(404).send({message: "User already logged out"});
})

export default loginRouter;