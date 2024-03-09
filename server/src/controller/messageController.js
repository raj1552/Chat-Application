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
    const { rows } = await pool.query(`SELECT u.id, u.username, u.email, c.conversation_id from conversations c join users u ON u.id = c.receiver_id  
                                      join users r ON r.id = c.sender_id where c.sender_id = $1;`, [user_id])

    if(rows.length == 0){
      return res.json([])
    }

    const conversations = rows.map(row => ({
  user: {
    email: row.email,
    username: row.username
  },
  conversation_id: row.conversation_id
}));

res.status(200).json(conversations);
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
    const {conversationId } = req.params;
    const { rows } = await pool.query(`SELECT id,username, email, message_text FROM users 
                                      join messages on users.id = messages.sender_id where conversation_id = $1`, [conversationId]);
    
    if(rows.length === 0){
      return res.json({ Error :"No Conversation Found!!"})
    }

    const renderMessages = rows.map((row) =>({
      "user":{
        "id": row.id,
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
