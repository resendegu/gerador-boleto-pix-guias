import { AppBar, Button, Dialog, Fab, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Close, Save } from '@mui/icons-material'
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import CloseIcon from '@material-ui/icons/Close';
// import Slide from '@material-ui/core/Slide';
// import { Fab } from '@material-ui/core';
// import { Save } from '@material-ui/icons';

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     position: 'relative',
//   },
//   title: {
//     marginLeft: theme.spacing(2),
//     flex: 1,
//   },
//   extendedIcon: {
//     marginRight: theme.spacing(1),
//   },
// }));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ isOpen, onClose, onSave, title, saveButton, saveButtonDisabled, hideSaveButton, children }) {
  
  //const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave();
  }

  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

  return (
    <div>
      
      <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
      
        <AppBar position='relative'>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Close />
            </IconButton>
            <Typography variant="h6">
              {title}
            </Typography>
            {!hideSaveButton && (
              <Button autoFocus disabled={saveButtonDisabled} color="inherit" onClick={handleSave}>
                {saveButton}
              </Button>
            )}
            
          </Toolbar>
        </AppBar>
        <>{children}</>
        {!hideSaveButton && (
          <div>
            <Fab onClick={handleSave} style={fabStyle} disabled={saveButtonDisabled} variant="extended" color='primary'>
              <Save />
              {saveButton}
            </Fab>
          </div>
        )}
        
        
        
      </Dialog>
      
    </div>
  );
}
