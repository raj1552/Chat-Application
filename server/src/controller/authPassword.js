import pool from '../../db/config.js'
import nodemailer from 'nodemailer'

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json("Email required!");
        }
        const { rows } = await pool.query('SELECT * FROM users where email = $1;', [email]);

        if (rows.length === 0) {
            return res.status(400).json("User does not exist");
        }

        const opt = Math.floor(1000 + Math.random() * 9000);
        const optExpires = new Date();
        optExpires.setMinutes(optExpires.getMinutes() + 1);

        var smtpConfig = {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, // use SSL
          auth: {
              user: 'anurajshrestha75@gmail.com',
              pass: 'yvms uizw dher pxta '
          }
      };
      var transporter = nodemailer.createTransport(smtpConfig);

        const mailOptions = {
            from: 'anurajshrestha75@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `Your Password reset code is ${opt}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json("Failed to send email");
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json("Your OTP has been sent to the email.");
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error");
    }
};

const resetPassword = async (req, res) =>{
    try{

    }
    catch(error){
        console.error(error)
    }
}
export default { forgetPassword, resetPassword }
