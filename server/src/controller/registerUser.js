import bcrypt from 'bcrypt'
import supabase from '../../db/config.js'

const registerUser = async (req, res) =>{
  try{
    const { email, username, password, confirmpassword, phonenumber } = req.body

    if(!email || !username || !password || !confirmpassword){
      return res.status(401).json({error : 'Email, Username, Password & Confirmpassword Required'})
    }
    if(password !== confirmpassword){
      return res.status(401).json({error : 'Password No Match'})
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const { user, error } = await supabase.auth.signUp({
      email,
      password: hashedPassword,
    });

    const { data, error: insertError } = await supabase
    .from('users')
    .insert([{ username, password: hashedPassword, confirmpassword: hashedPassword, email, phone_number: phonenumber }])
    .single();

  if (insertError) {
    console.error(insertError);
    return res.status(400).json({ error: 'Failed to insert user data' });
  }
    res.json({sucess : true, body: {id : data.rows[0].id}})
  }
  catch(err){
    console.error(err)
    res.status(400).json({error: 'Something Went Wrong'})
  }
}

export default { registerUser }
