import passport from "passport";
import {Strategy} from 'passport-local';
import { User } from "../mongoose/schemas/UserSchema.mjs";
import { comparePassword } from "../utils/passwordEncryptor.mjs";

passport.serializeUser((user,done) => {
    done(null,user.email);
})

passport.deserializeUser(async (email, done) => {
    try {
        let findUser = await User.findOne({email});
        if(!findUser) throw new Error ('User not found');
        done(null,findUser);
    } catch (error) {
        done(error,null);
    }
})

export default passport.use(
    new Strategy({
        usernameField: "email",
        passwordField: "password"
    }, async(email, password, done) => {
        try {
            let findUser = await User.findOne({email});
            if(!findUser) throw new Error ("User not found please signup");
            let isMatch = await comparePassword(password, findUser.password);
            if(!isMatch) return  done(null,false,{message:"Incorrect password"});
            done(null, findUser);
        } catch (error) {
            done(`Sorry something went wrong ${error}`,null)
        }
    })
)