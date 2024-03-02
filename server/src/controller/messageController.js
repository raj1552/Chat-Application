import pool from '../../db/config.js'

const getMessages = async (req , res) =>{
  try{
    const {from , to} = req.body;
    const { rows } = await pool.query('SELECT message_text FROM messages where sender_id= $1 AND receiver_id=$2;', [from, to])

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


const addMessages = async (req, res) =>{
  try { 
    const { from, to, message } = req.body;
    const { rows } = await pool.query("INSERT INTO messages (sender_id, receiver_id, message_text, sent_at) VALUES ($1, $2, $3, NOW()) RETURNING *", [from, to, message]);

    res.status(201).json({msg: "Message send sucessfull"})
  }
  catch(error) {
    console.error(error);
  }
}

export default { getMessages, addMessages }
