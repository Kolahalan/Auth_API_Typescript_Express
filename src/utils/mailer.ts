import nodemailer, {SendMailOptions} from "nodemailer"
import config from "config"
import log from "./logger"

// async function createTestCreds(){
//     const creds = await nodemailer.createTestAccount();
//     console.log({creds})
// }

// createTestCreds();

const smtp = config.get<{
    user: string,
    pass: string,
    port: number,
    secure: boolean
}>("smtp")

const transporter = nodemailer.createTransport({ //This needs to run just once as the app starts, and later we could keep using this transporter
    ...smtp,
    auth: { user: smtp.user, pass: smtp.pass }
})

async function sendEmail(payload: SendMailOptions){ // type SendMailOptions comes from nodemailer
    transporter.sendMail(payload, (err,info)=>{
        if (err){
            log.error(err, "Error sending email")
            return
        }

        log.info(`Preview URL:${nodemailer.getTestMessageUrl(info)} `) //This will generate a preview link after a user is generated and the message sent to your given mail
    })

}

export default sendEmail