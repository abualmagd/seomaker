
//todo create api key then complete 

const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");

const sendEmail = async () => {

    const mailersend = new MailerSend({
        api_key: "key",
    });

    const recipients = [new Recipient("recipient@email.com", "Your Client")];

    const personalization = [
        {
            data: {
                name: "Dear",
                support_email: "support@solutrend.com",
                account_name: "ismail abu almagd"
            },
        }
    ];

    const emailParams = new EmailParams()
        .setFrom("hi@solutrend.com")
        .setFromName("ismail abu almagd")
        .setRecipients(recipients)
        .setSubject("Subject")
        .setTemplateId('z3m5jgr8njxldpyo')
        .setPersonalization(personalization);

    await mailersend.send(emailParams);
}


module.exports = sendEmail;