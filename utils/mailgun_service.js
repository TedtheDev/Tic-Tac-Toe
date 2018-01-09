function MailgunService(apiKey, domain) {
    const mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});
    return (function(config){
        return new Promise((resolve, reject) => {
            const message = {
                to: config.to,
                from: config.from,
                subject: config.subject,
                text: config.text,
                html: config.html
              };
        
              mailgun.messages().send(message, function(err, body){
                if(err !== null) {
                    reject(err);
                } else {
                    resolve(body);
                }
              });
        });
    });
};

module.exports = MailgunService;