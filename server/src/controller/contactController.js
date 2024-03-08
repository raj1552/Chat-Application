import pool from '../../db/config.js'

const Contact = async (req, res) =>{
    try{
        const {rows} = await pool.query("SELECT * FROM users")
        
        res.status(200).json(rows)
    }
    catch(error){
        console.error(error)
    }
}

export default {Contact};