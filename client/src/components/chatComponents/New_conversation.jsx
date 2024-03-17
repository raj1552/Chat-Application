import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import axios from "axios";

const Newconversation = (props) => {
  const { open, onClose } = props;
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
   const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const user_id = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        `http://localhost:5000/api/user/${user_id?.id}`
      );
      setUser(response.data.users);
    };
    fetchData();
  }, []);

  const handleClick = async (selecteduser) => {
    try{
      const response = await axios.post('http://localhost:5000/api/conversation', {
        sender_id: JSON.parse(localStorage.getItem('user')).id,
        receiver_id: selecteduser
      })
      onClose();
    }
    catch(error){
      console.error('Error selecting user:', error)
    }
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredUsers = user.filter(({ user }) =>
    user.username.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Conversation</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Enter Email or Username"
          type="email"
          fullWidth
          variant="standard"
          value={filterText}
          onChange={handleFilterChange}
        />
      </DialogContent>
      <List sx={{ pt: 0 }}>
        {user.length > 0 ? (
          user.map(({ user}) => (
            <ListItem disableGutters key={user.id}>
              <ListItemButton
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}

                onClick={() => {handleClick(user.id)}}
              >
                <ListItemText primary={user.username} />
                <ListItemText sx={{ fontSize: 12 }} primary={user.email} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <h3>No User</h3>
        )}
      </List>
    </Dialog>
  );
};

export default Newconversation;
