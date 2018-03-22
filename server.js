const express       = require('express');
const bodyParser    = require('body-parser');
const ejs           = require('ejs');
const http          = require('http');
const container     = require('./container');
const flash         = require('flash');
const session       = require('express-session');
const mongoose      = require('mongoose');
const MongooseStore = require('connect-mongo')(session)

container.resolve(function(users){

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://root:toor@ds253468.mlab.com:53468/auth', () => {
        console.log('Connected');
    });

    const app = SetupExpress();

    function SetupExpress(){
        const app = express();
        const server = http.createServer(app);
        server.listen(3000, () => {
            console.log('Listening on port 3000');
        });

        ConfigureExpress(app);
        users.SetRouting(app);
    }

    function ConfigureExpress(app){
        require('./passport/passport-local');

        app.use(express.static('public'));
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(session({
            secret: 'topsecrect',
            resave: true,
            saveUninitialized: true,
            store: new MongooseStore({
                mongooseConnection: mongoose.connection
            })
        }))
        app.use(flash());
    }
});