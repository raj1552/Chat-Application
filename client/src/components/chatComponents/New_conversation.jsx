import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemButton } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';

const Newconversation = (props) => {
  const { open, onClose } = props;
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
      />
      </DialogContent>
      <List sx={{ pt:0 }}>
        <ListItem disableGutters >
            <ListItemButton>
            <ListItemText>
                User
            </ListItemText>
            </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default Newconversation;
