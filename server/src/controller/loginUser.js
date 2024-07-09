import bcrypt from 'bcrypt';
import supabase from '../../db/config.js'; // Adjust the path accordingly
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(401).json({ error: 'Username & Password Required!!' });
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', identifier)
      .single();

    if (error || !data) {
      return res.status(401).json({ error: 'User Not Found or Wrong Password' });
    }

    const passwordMatch = await bcrypt.compare(password, data.password);

    if(!passwordMatch){
      return res.status(401).json({error: 'User Not Found or Wrong Password'});
    }

    // Generate JWT token (optional)
    const token = jwt.sign({ user: data }, '12345', { expiresIn: '1h' });

    // Set token in cookie (optional)
    res.cookie('authcookie', token, { httpOnly: true });

    // Respond with success and user information
    res.status(200).json({
      success: true,
      body: {
        token,
        user: {
          id: data.id,
          email: data.email,
          username: data.username, 
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { loginUser };
