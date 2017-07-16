# EmailApp
A little page to send emails with.

### Setup API accounts ###
You'll need to make accounts for both Mailgun and Sendgrid.

[Mailgun](https://www.mailgun.com/)
[Sendgrid](https://sendgrid.com/)

**Note:** Free accounts through Mailgun need to have setup authorized recipients for the emails to go through.
This is useful for testing the automatic failover of the system. It will try to user Mailgun first, and if it fails for some reason, it will automaticly use Sendgrid as a backup. 

### Insert API keys and domain info. ###

In the server.js file, there are the following variables:

- `mailgun_api_key` - mailgun api key
- `mailgun_domain` - the domain string that mailgun assigns your account
- `sendgrid_api_key` - sendgrid api key
- `from_who` - The email address you want shown as the sender.

Paste in the appropriate info for your accounts and save the file.

### Running the project ###

1. Navigate to the EmailApp directory.
2. Run npm install
3. Run npm start
4. Navigate to http://localhost:8080/