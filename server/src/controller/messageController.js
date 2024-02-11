import pool from '../../db/config.js'

const getMessages = async (req , res) =>{
  try{
    const {from , to} = req.body;
    const { rows } = await pool.query('SELECT sender, message_text FROM messages where from_user= $1 AND to_user=$1;', [from, to])

    const projectedMessages = rows.map((msg) =>{
      return{
        fromSelf: msg.sender === from,
        message: msg.message_text
      }
    })
    res.json(projectedMessages)
  }
  catch(error){
    console.error({error: error})
    res.status(400).json({error: 'Something went wrong'})
  }
}

export module { getMessages }
