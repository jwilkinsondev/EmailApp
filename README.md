# EmailApp
A little page to send emails with.

### Setup API accounts ###
You'll need to make accounts for both Mailgun and Sendgrid.

[Mailgun](https://www.mailgun.com/)
[Sendgrid](https://sendgrid.com/)

**Note:** Free accounts through Mailgun need to have setup a/n authorized recipuent/s for the emails to go through.
This is useful for testing the automatic failover of the system. It will try to user Mailgun first, and if it fails (by sending to a non authorized account) for some reason, it will automaticly use Sendgrid as a backup. 

### Insert API keys and domain info. ###

In the server.js file, there are the following variables:

mailgun_api_key - mailgun api key
mailgun_domain - the domain string that mailgun assigns your account
sendgrid_api_key - sendgrid api key
from_who - The domain you want shown for the sender.

Paste in the appropriate info for your accounts and save the file.

### Running the project ###

Navigate to the EmailApp directory.
Run npm install
Run npm start
Navigate to http://localhost:8080/