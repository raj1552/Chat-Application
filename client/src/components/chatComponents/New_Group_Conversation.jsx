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
  const { unrolled, onrolled } = props;
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [groupname, setGroupname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const user_id = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        `http://localhost:5000/api/user/${user_id?.id}`
      );
      setUsers(response.data.users);
    };
    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleGroupChat = async (selectedUsers) => {
    console.log(groupname);
    console.log(selectedUsers);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/creategroup",
        {
          groupname: groupname,
          selecteduser: selectedUsers,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  return (
    <Dialog open={unrolled} onClose={onrolled}>
      <DialogTitle>Create New Conversation</DialogTitle>
      <DialogContent className="dialogue-box">
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
      <List sx={{ pt: 0, margin: "0px 20px 0px 20px" }}>
        {users.length > 0 ? (
          users
            .filter(({ user }) =>
              user.username.toLowerCase().includes(filterText.toLowerCase())
            )
            .map(({ user }) => (
              <ListItem disableGutters key={user.id}>
                <ListItemButton
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                  onClick={() => {
                    handleClick(user.id);
                  }}
                  selected={selectedUsers.includes(user.id)}
                >
                  <div className="selectuser-dialogue">
                    <div className="selectusers">
                      <ListItemText primary={user.username} />
                      <ListItemText
                        sx={{ fontSize: 12 }}
                        primary={user.email}
                      />
                    </div>
                    <input
                      type="checkbox"
                      name="selectedUsers"
                      value={user.id}
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => {
                        handleClick(user.id);
                      }}
                    />
                  </div>
                </ListItemButton>
              </ListItem>
            ))
        ) : (
          <h3>No User</h3>
        )}
        <div className="section-items">
          <input
            type="text"
            variant="standard"
            id="groupname"
            label="Enter Your Group name"
            value={groupname}
            onChange={(e) => setGroupname(e.target.value)}
            placeholder="Enter Your Name of the Group"
          />
          <div className="buttons">
            <button className="userinteraction-button" onClick={() => handleGroupChat(selectedUsers)}>
              Create Group
            </button>
            <button className="userinteraction-button" onClick={onrolled}>Cancel</button>
          </div>
        </div>
      </List>
    </Dialog>
  );
};

export default Newconversation;
