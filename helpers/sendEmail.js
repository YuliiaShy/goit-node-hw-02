const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_TOKEN, MY_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_TOKEN);

const sendEmail = async (data) => {
    const email = { ...data, from: `${MY_EMAIL}` };
    await sgMail.send(email)
    .then(() => { console.log("Message sent successfully") })
    .catch(err => { return console.error(err) });
    return true;
};

module.exports = sendEmail;
 