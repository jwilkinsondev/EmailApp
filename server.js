
// api keys and domains
//---------------------------------------------------------
// mailgun

var mailgun_api_key = "MAILGUN_API_KEY"; // place your mailgun api key here
var mailgun_domain = "MAILGUN_DOMAIN"; // place your mailgun domain here
// sendgrid
var sendgrid_api_key = "SENDGRID_API_KEY"; // place your sendgrid api key here

var from_who = "SOMETHING@EXAMPLE.COM"; // place the email you would like as the sender email.


//---------------------------------------------------------
// Setup
//---------------------------------------------------------

// get the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Mailgun = require('mailgun-js');
var sendgridHelper = require('sendgrid').mail;
var sg = require('sendgrid')(sendgrid_api_key);

// setup bodyParser() so that we can get the data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the port
var port = process.env.PORT || 8080; // feel free to change this port as needed.

//---------------------------------------------------------
// Routes
//---------------------------------------------------------
var router = express.Router();  // get the express router

// test route
router.get('/', function (req, res) {
    res.json({ message: 'Welcome to the api!' });
});

// other Routes

router.route('/email')
    // create POST route
    .post(function (req, res) {
        // do email stuff
        mailgunSendMail(req, function (result) {
            if (result) {
                console.log("Used Mailgun api.");
                res.json({ message: "Success", wasSuccessful: true });
            }
            else {
                sendgridSendMail(req, function (result) {
                    if (result) {
                        console.log("Used Sendgrid api.");
                        res.json({ message: "Success" , wasSuccessful: true});
                    }
                    else {
                        console.log("Both api's failed.");
                        res.json({ message: "An error occured" , wasSuccessful: false });
                    }
                })
            }
        });
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

/**
 * mailgunSendMail - sends an email using the mailgun api
 * @param {object} req - the request object sent in from our route
 * @param {function} callback - callback method for letting us know the success or failure of the call.
 * @returns {undefined} undefined
 */
mailgunSendMail = function (req, callback) {
    var mailgun = new Mailgun({ apiKey: mailgun_api_key, domain: mailgun_domain });

    var data = {
        from: from_who,
        to: req.body.address,
        subject: "Message from mail app using mailgun.",
        html: req.body.message
    };

    mailgun.messages().send(data, function (err, body) {
        if (err) {
            callback(false); // failure
        }
        else {
            callback(true); // success
        }
    })
};

/**
 * sendgridSendMail - sends an email using the sendgrid api
 * @param {object} req - the request object sent in from our route
 * @param {function} callback - callback method for letting us know the success or failure of the call.
 * @returns {undefined} undefined
 */
sendgridSendMail = function (req, callback) {
    var fromEmail = new sendgridHelper.Email(from_who);
    var toEmail = new sendgridHelper.Email(req.body.address);
    var subject = "Message from mail app using sendgrid.";
    var content = new sendgridHelper.Content('text/plain', req.body.message);
    var mail = new sendgridHelper.Mail(fromEmail, subject, toEmail, content);

    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function (err, response) {
        if (err) {
            callback(false); // failure
        }
        else {
            callback(true); // success
        }
    });
};