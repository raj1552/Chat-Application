import pool from '../../db/config.js'

const createGroup = async (req, res) =>{
  try {
    const { groupname, selecteduser } = req.body

    const { rows } = await pool.query('INSERT INTO group_conversation (group_name) VALUES ($1) RETURNING group_id;',[groupname])
    const groupId = rows[0].group_id

    for( const userId of selecteduser) {
      await pool.query('INSERT INTO group_members (group_member_id, group_id) VALUES ($1, $2);', [userId, groupId])
    }

    res.status(200).json({message:"Sucessfully Created group"})
  }
  catch(error) {
    console.error(error)
  }
}

const sendMessage = async (req, res) =>{
  try {
    const { group_id, message_text, sender_id } = req.body

    await pool.query('INSERT INTO group_message (group_id, message_text, sender_id) VALUES ($1, $2, $3);', [group_id, message_text, sender_id]);
    res.status(200).json({message: "message send Sucessfully"})
  }
  catch(error) {
    console.error(error)
  }
}

export default { createGroup, sendMessage }
