import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import express from 'express';

let databaseName = 'FoodFinder'
let mongoURI = `mongodb+srv://text-yt:xMBlzelCpUmUh6oJ@cluster0.oikgl.mongodb.net/${databaseName}`;

let router = express();
const mongoOptions = {
    retryWrites: true,
    w: "majority",
    tls: true,
    tlsInsecure: false,
    // tlsAllowInvalidCertificates: true
};

let mongoConnect = () => {
    mongoose.connect(mongoURI, mongoOptions)
        .then((data)=> {
            console.log('Connected to MongoDB Successfully')
        })
        .catch((error) => {
            console.log('Failed to connect to connect to MongoDB ', error);
        })
}

mongoConnect();

router.use(express.json());

router.use(cookieParser('CookieSecret'));
router.use(
    session({
      secret: "FoodFinderCookieSecretComplex",
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        // 7 days
      },
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
      }),
    })
  )



router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
    console.log(req.session);
    req.session.visited = true;

    res.status(200).send('Hello from the home route!');
})

export default router;

