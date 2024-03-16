import pool from '../../db/config.js'
import cors from 'cors'


const createConversation = async (req, res) =>{
  try {
    const { sender_id , receiver_id } = req.body;

     

    await pool.query("INSERT INTO members(user_id, conversation_id) VALUES ($1 , $2), ($3, $2);", [ sender_id, rows[0].conversation_id, receiver_id]);

    res.status(200).json("Created Sucessfully");
  }
  catch(error) {
    console.error(error)
  }
}

const addUser = async (req, res) =>{
  try{
    const { user_id } = req.params

    id(!user_id){
      return res.json("No user Found");
    }

    const { rows } = await pool.query(``,[user_id])

    if(rows.length == 0){
      return res.json([])
    }

    res.status(200).json({rows})
  }
  catch(err) {
    console.error(err)
  }
}

const getUser = async (req, res) =>{
  try{
    const { user_id } = req.params

    if(!user_id){
      return res.json("no Conversation")
    }
    const { rows } = await pool.query(`SELECT c.conversation_id,u.email, u.id AS user_id, u.username FROM conversations c 
                                      JOIN members m ON c.conversation_id = m.conversation_id JOIN users u ON m.user_id = u.id
                                      WHERE c.conversation_id IN (SELECT conversation_id FROM members WHERE user_id = $1
                                      ) AND m.user_id <> $1;`, [user_id])

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
  catch(error) {
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
    const { rows } = await pool.query('INSERT INTO conversations (created_at) VALUES (CURRENT_TIMESTAMP) RETURNING conversation_id;');

    await pool.query("INSERT INTO members(user_id, conversation_id) VALUES ($1 , $2), ($3, $2);", [ sender_id, rows[0].conversation_id, receiver_id]);

    return res.status(200).json("Conversation created sucessfully")
  }

    const { rows } = await pool.query("INSERT INTO messages(conversation_id, message_text, sender_id) VALUES ($1, $2, $3);",
                                      [conversation_id, message, sender_id]);
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
