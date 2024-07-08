import pool from '../../db/config.js'
import cors from 'cors'


const createConversation = async (req, res) =>{
  try {
    const { sender_id , receiver_id } = req.body;

    const { rows } = await pool.query('INSERT INTO conversations (created_at) VALUES (CURRENT_TIMESTAMP) RETURNING conversation_id;')

    await pool.query("INSERT INTO members(user_id, conversation_id) VALUES ($1 , $2), ($3, $2);", [ sender_id, rows[0].conversation_id, receiver_id]);

    res.status(200).json("Created Sucessfully");
  }
  catch(error) {
    console.error(error)
  }
}

const getConversation = async (req, res) => {
  try {
    const { conversation_id, sender_id} = req.params

    if(!conversation_id || !sender_id) {
      return res.json("No user Found");
    }

    const receiverId = await pool.query('SELECT * from members join conversations on members.conversation_id = conversations.conversation_id where members.conversation_id = $1 AND members.user_id <> $2;',[conversation_id, sender_id])
    const receiverResult = receiverId.rows[0].user_id
    res.status(200).json({
      receiverId: receiverResult
    })
  }
  catch(error) {
    console.log(error)
  }
}

const addUser = async (req, res) =>{
  try{
    const { user_id } = req.params

    if(!user_id){
      return res.json("No user Found");
    }

    const { rows } = await pool.query(`SELECT * FROM users where id <> $1`,[user_id])

    if(rows.length == 0){
      return res.json([])
    }

    const users = rows.map(row => ({
      user:{
        id : row.id,
        username: row.username,
        email: row.email
      }
    }))

    res.status(200).json({users})
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

    await pool.query("INSERT INTO messages(conversation_id, message_text, sender_id, receiver_id) VALUES ($1, $2, $3, $4);",
                                      [conversation_id, message, sender_id, receiver_id]);
    res.status(200).json("Message Sent")
  }
  catch(error){
    console.error(error)
  }
}

const getMessage = async (req, res) =>{
  try{
    const {conversationId } = req.params;
    const { rows } = await pool.query(`SELECT users.id, users.username, users.email, messages.message_text, messages.message_id, messages.sent_at
                                      FROM users JOIN messages ON users.id = messages.sender_id WHERE messages.conversation_id = $1
                                        ORDER BY messages.sent_at ASC;`, [conversationId]);
    
    if(rows.length === 0){
      return res.json({ Error :"No Conversation Found!!"})
    }

    const renderMessages = rows.map((row) =>({
      "user":{
        "id": row.id,
        "username":row.username,
        "email":row.email
      },
      "message": row.message_text,
      "send_at": row.sent_at
    }))
    res.status(200).json(renderMessages)
  }
  catch(error){
    console.error(error)
  }
}

export default { createConversation, getConversation, getMessage, createMessage, getUser, addUser }
