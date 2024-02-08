/* eslint-disable react/prop-types */
import { AppBar, Button, Dialog, Fab, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Close, Save } from '@mui/icons-material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ isOpen, onClose, onSave, title, saveButton, saveButtonDisabled, hideSaveButton, children }) {

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
      
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
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
