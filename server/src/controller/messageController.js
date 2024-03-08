import pool from '../../db/config.js'
import cors from 'cors'


const createConversation = async (req, res) =>{
  try{
    const { sender_id , receiver_id } = req.body;
    await pool.query("INSERT INTO conversations(sender_id, receiver_id) VALUES ($1 , $2);", [ sender_id, receiver_id]);

    res.status(200).json("Created Sucessfully");
  }
  catch(error){
    console.error(error)
  }
}

const getUser = async (req, res) =>{
  try{
    const { user_id } = req.params

    if(!user_id){
      return res.json("no Conversation")
    }
    const { rows } = await pool.query(`SELECT email, username, conversation_id FROM users JOIN conversations ON users.id = conversations.sender_id 
                                      OR users.id = conversations.receiver_id WHERE users.id = $1;`, [user_id])

    if(rows.length == 0){
      return res.json("No converstion")
    }

    res.status(200).json({
      "user":{
        "email": rows[0].email,
        "username": rows[0].username
      },
      "conversation_id": rows[0].conversation_id,
      }
  )
  }
  catch(error){
    console.log(error)
  }
}

const createMessage = async (req , res) =>{
  try{
    const { conversation_id, sender_id, message, receiver_id } = req.body;

    if(!sender_id || !message){
      return res.json("Please fill all the fields")
    }

    if(!conversation_id){
      await pool.query("INSERT INTO conversations(sender_id, receiver_id) VALUES ($1, $2) RETURNING conversation_id;", [sender_id, receiver_id]);
      return res.status(200).json("Conversation created sucessfully")
    }

    const { rows } = await pool.query("INSERT INTO messages(conversation_id, message_text, sender_id) VALUES ($1, $2, $3);", [conversation_id, message, sender_id]);
    res.status(200).json("Message Sent")
  }
  catch(error){
    console.error(error)
  }
}

const getConversation = async (req, res) =>{
  try{
    const {conversation_id } =req.params;
    const { rows } = await pool.query(`SELECT username, email, message_text FROM users 
                                      join messages on users.id = messages.sender_id where conversation_id = $1`, [conversation_id]);
    
    if(rows.length === 0){
      return res.json({ Error :"No Conversation Found!!"})
    }

    const renderMessages = rows.map((row) =>({
      "user":{
        "username":row.username,
        "email":row.email
      },
      "message": row.message_text
    }))
    res.status(200).json(renderMessages)
  }
  catch(error){
    console.error(error)
  }
}

export default { createConversation, getConversation, createMessage, getUser }
