import jwt from 'jsonwebtoken'

const authenticateToken = async (req, res, next) =>{
  const { authcookie } = req.cookies

  if(!authcookie){
  return res.redirect('/')
  }
  
  try{
    const jsonToken = jwt.verify(authcookie , '12345')
    req.user = jsonToken.user
    next()
  }
  catch(err){
    return res.status(403).json({error : 'Forbidden'})
  }
}

export default authenticateToken
