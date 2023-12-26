const user = require('../models/userModel');
const qrCode = require('../models/qrCodeModel');
const { v4: uuidv4 } = require('uuid')
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const QRCode = require('qrcode');


//creating ticket and sending it to Email
module.exports.generateQRCode = async (req, res) => {
    const { username, email } = req.body;
    const qr_id = uuidv4()
    if (!username || !email) {
        res.status(400).send('Please enter all fields');
    }

    const userfound = await user.findOne({ email });

    const exisitingUser = await qrCode.findOne({ user: userfound._id }); 
    if (exisitingUser) {
        res.status(400).send('User already has a QR Code');
    } 

    if (userfound) {
        owner = userfound._id;

        const newQrCode = new qrCode({ user: owner, qr_id });
        await newQrCode.save();
        await sendTicket(email,qr_id);
        res.status(201).json("QR Code generated successfully");
    }
    
    else {
        res.status(400).send('User does not exist');
    }

};

const sendTicket = async (email,qr_id) => {

    let config = {
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.PASSWORD}`
        }
    };

    const qrCodeimg = await QRCode.toDataURL(qr_id, {
                        width: 400,
                        margin: 2,
                        color: {
                            dark: '#335383FF',
                            light: '#EEEEEEFF'
                        }})

    console.log(qrCodeimg);
    let transporter = nodemailer.createTransport(config);
    let MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'MyApp',
            link: 'https://mailgen.js/'
        }

    });


    var response = {
        body: {
            name: 'John Appleseed',
            intro: 'You have received this email because a password reset request for your account was received.',
            action: {
                instructions: 'Click the button below to reset your password:',
                // Image: `${qrCodeimg}`,
                button: {
                    color: '#DC9E5F',
                    text: 'Click here',
                    link: `http://${qrCodeimg}`
                }
            },
            outro: 'If you did not request a password reset, no further action is required on your part.'
        }
    };


    var emailBody = MailGenerator.generate(response);
    const mailOptions = {
        from: `${process.env.EMAIL}`,
        to: `${email}`,
        subject: 'Your Ticket For the event is here', // subject
        html: emailBody,
        attachments: [
            {   
              filename: 'ticket.png',
              content: qrCodeimg.split("base64,")[1],
              encoding: 'base64'
            }
          ]
    };

    transporter.sendMail(mailOptions)
    .then(() => console.log('email sent'))
    .catch((err) => console.log(err));    

}


//frontend getting ticket
module.exports.getQRCode = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).send('Please enter all fields');
    }

    const found = await user.findOne({ email });

    if (!found) {
        res.status(400).send('User does not exist');
    }
    else{
        const qrCodeUser = await qrCode.findOne({ user: found._id });
        if(qrCode){
            res.status(200).json(qrCodeUser.qr_id);
        }
        else{
            res.status(400).send('User does not have a QR Code');
        }  
        
    }
}


//validating ticket by sending OTP on email and creating a page for employee for validating ticket
module.exports.validateUser = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).send('Please enter all fields');
    }

    const found = await user.findOne({ email });
    if (!found) {
        res.status(400).send('User does not exist');
    }

    const qrCodeUser = await qrCode.findOne({ user: found._id });
    if (!qrCodeUser) {
        res.status(400).send('User does not have a QR Code');
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    await sendOTP(email, otp);
    res.status(200).json("OTP sent successfully");
}


module.exports.reedeemCoupon = async (req, res) => {
    const { qr_id } = req.body;
    if (!qr_id) {
        res.status(400).send('Please enter all fields');
    }

    const found = await user.findOne({ qr_id });
    if (!found) {
        res.status(400).send('User does not exist');
    }

    found.validated = true;
    await found.save();
    res.json("User validated successfully");
}


