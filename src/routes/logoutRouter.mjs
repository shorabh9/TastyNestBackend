import '../strategies/localStrategy.mjs';
import { Router } from 'express';
import { Passport } from 'passport';

let logoutRouter = Router();

logoutRouter.post("/logout", (req, res) => {
    if(!req.user) return res.sendStatus(401);

    req.logout((err) => {
        if(err) return res.sendStatus(400);
        req.cookies.isAuthenticated = false;
        req.cookies.useremail = "";
        res.status(200).send("User logged out successful");
    });
})

export default logoutRouter;