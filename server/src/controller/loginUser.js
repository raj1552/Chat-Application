import bycrpt from 'bycrypt'
import pool from "../../db/config.js"
import jwt from 'jsonwebtoken'

const loginUser = async (req , res) =>{
  try{
    //Identifier for username or email//
    const {identifier, password} = req.body

    if(!identifier || !password){
      return res.status(401).json({error : 'Username & Password Required!!'})
    }

    const { rows } = await pool.query("SELECT username FROM users WHERE username = $1 or email = $2", [identifier , identifier])
    const token = jwt.sign({user : identifier}, '12345')

    if(rows.length === 0){
      return res.status(401).json({error : 'User Not Found'})
    }

    const hashedPassword = rows[0].password
    const passwordMatch = await bycrpt.compare(password , hashedPassword)

    if(!passwordMatch){
      return res.status(401).json({error : 'Wrong Password'})
    }

    res.cookie('authcookie', token)
    res.status(200).json({sucess : true, body:{token}})
  }
  catch(err){
    console.error(err)
    res.status(500).json({error : 'Internal Server Error' })
  }
}

export default loginUser;
