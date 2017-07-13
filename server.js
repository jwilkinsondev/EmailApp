
//---------------------------------------------------------
// Setup
//---------------------------------------------------------

// get the packages we need
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');

// setup bodyParser() so that we can get the data from POST
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

// set the port
var port = process.env.PORT || 8080;

//---------------------------------------------------------
// Routes
//---------------------------------------------------------
var router = express.Router();  // get the express router

// test route
router.get('/',function(req, res){
    res.json({ message: 'Welcome to the api!'});
});

// other Routes

router.route('/email')
    // create POST route
    .post(function(req, res) {
        // do email stuff
        debugger;
        res.json({ message: 'email sent'})
    });

// register the api Routes
app.use('/api', router);
// serve static files
app.use(express.static('static_files'));

//---------------------------------------------------------
// Start server
//---------------------------------------------------------
app.listen(port);
console.log("Currently using port: " + port);
