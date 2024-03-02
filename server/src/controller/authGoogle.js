import express from 'express'
import axios from 'axios'

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

const authGoogle = async (req , res) =>{

  try{
    const url = await `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`
    res.redirect(url)
  }
  catch(error){
    console.error(error)
  }
}

const callbackGoogle = async (req , res) =>{
  
  const { code } = req.query
  console.log(code)
  try{
    const { data } = await axios.post('<https://oauth2.googleapis.com/token>', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    })

    const { access_token, id_token } = data
    console.log(access_token)
    console.log(data)
    const { data : profile} = await axios.get('<https://www.googleapis.com/oauth2/v1/userinfo>',{
      headers: { Authorization: `Bearer ${access_token}` },
    })

    res.redirect('/')
  }
  catch(error){
    console.error(error)
    res.redirect('/user/login')
  }
}

export default { authGoogle, callbackGoogle }


