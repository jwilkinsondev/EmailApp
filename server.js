
// api keys and domains
//---------------------------------------------------------
// mailgun
var mailgun_api_key = "MAILGUN_API_KEY"
var mailgun_domain  = "MAILGUN_DOMAIN"
var from_who        = "SOMETHING@EXAMPLE.COM"
// sendgrid
var sendgrid_api_key    = "SENDGRID_API_KEY";

//---------------------------------------------------------
// Setup
//---------------------------------------------------------

// get the packages we need
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var Mailgun     = require('mailgun-js');
var sendgridHelper = require('sendgrid').mail;
var sg             = require('sendgrid')(sendgrid_api_key);


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
        console.log("in the post");
        var mailgun = new Mailgun({apiKey: mailgun_api_key, domain: mailgun_domain});

        var data = {
            from: from_who,
            to: req.body.address,
            subject: "Message from mail app.",
            html: req.body.message
        }

        mailgun.messages().send(data, function(err, body){
            if(err) {
                // use fallback service
                res.json({ message: 'An error occured'})
            }
            else {
                res.json({message: "Success"});
            }
        })


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


mailgunSendMail = function(req, res){

};
sendgridSendMail = function(req, res){
    var fromEmail = new sendgridHelper.Email(from_who);
    var toEmail = new sendgridHelper.Email(req.body.address);
    var subject = "Message from mail app.";
    var content = new sendgridHelper.Content('text/plain', req.data.message);
    var mail = new sendgridHelper.Mail(fromEmail, subject, toEmail, content);

    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });
    sg.API(request, function(err, response){
        if(err) {
            console.log('Sendgrid error response received');
        }
        else{
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
            res.json({message: "Success"});

        }
    });
};