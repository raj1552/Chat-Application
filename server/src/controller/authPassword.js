import pool from '../../db/config.js'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'

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
        
        const userId = rows[0].id
        const otp= Math.floor(1000 + Math.random() * 9000);
        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 10)
        
        await pool.query('INSERT INTO otp (user_id, otp, expiration_time) values($1, $2, $3);', [userId, otp, otpExpires])

        const smtpConfig = {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, 
          auth: {
              user: 'anurajshrestha75@gmail.com',
              pass: 'yvms uizw dher pxta '
          }
      };

      const transporter = nodemailer.createTransport(smtpConfig);

        const mailOptions = {
            from: 'anurajshrestha75@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `Your Password reset code is ${otp}`
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
    const { otp, password, confirmpassword } = req.body;

    if(!password || !confirmpassword || !otp){
      return res.status(400).json("Password ,Confirmpassword and OTP required!")
    }
    
    const { rows } = await pool.query('SELECT * FROM otp where otp = $1 and expiration_time > now();', [otp]);
    
    if(rows.length == 0){
      return res.status(400).json("Invalid or expired otp")
    }

    if(password != confirmpassword){
      return res.status(400).json("Password & Confirmpassword do not match")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query("UPDATE users SET password = $1, confirmpassword = $2 where id = $3;", [hashedPassword, hashedPassword, rows[0].userId])

    await pool.query('DELETE FROM otp;')
    res.status(200).json({message : 'Password reset sucessfully', password:hashedPassword})
    }
    catch(error){
        console.error(error)
    }
}
export default { forgetPassword, resetPassword }
