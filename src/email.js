const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
require("dotenv").config()
const hbs = require("handlebars")
const path= require("path");
const fs = require("fs")

class emailClass
{
    constructor(link)
    {
       
        this.link = link;
    }


     resetPass()
    {
        const templateSource = fs.readFileSync(path.join(__dirname,"emailTemps","ResetPass.hbs"), "utf8");
        const template = hbs.compile(templateSource);
        return template({link:this.link })
    }
    confirmAccount()
    {
        const templateSource = fs.readFileSync(path.join(__dirname,"emailTemps","Confirm.hbs"), "utf8");
        const template = hbs.compile(templateSource);
        return template({link:this.link })
    }
}


async function sendEmail(option)
{

    const options = {
        auth: {
          api_key:process.env.SEND_GRID_API_KEY
        }
      };
    
      const transporter = nodemailer.createTransport(sgTransport(options));
    
      const mailOptions = {
        from: process.env.SEND_EMAIL_FROM,
        to: option.to,
        subject:option.subject,
        html: option.html
      };
    
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

}

module.exports = {sendEmail,emailClass}
