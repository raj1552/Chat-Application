import bcrypt from 'bcrypt'
import pool from '../../db/config.js'
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) =>{
  try{
    const { email, username, password, confirmpassword, phonenumber } = req.body

    if(!email || !username || !password || !confirmpassword){
      return res.status(401).json({error : 'Email, Username, Password & Confirmpassword Required'})
    }
    
    if(password !== confirmpassword){
      return res.status(401).json({error : 'Password No Match'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const { rows } = await pool.query("INSERT INTO users (username, password, confirmpassword, email, phone_number) VALUES ($1, $2, $3, $4, $5);",
                                      [username, hashedPassword, hashedPassword, email, phonenumber])
    const userId = await pool.query("SELECT id FROM users where username = $1", [username])
    res.json({sucess : true, body: {id : userId.rows[0].id}})
  }
  catch(err){
    console.error(err)
    res.status(400).json({error: 'Something Went Wrong'})
  }
}

export default { registerUser }