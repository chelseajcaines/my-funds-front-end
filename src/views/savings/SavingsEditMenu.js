import { useState } from 'react';
import Grid from '@mui/material/Grid';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { IconButton, Menu, MenuItem } from '@mui/material';

const EditMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Grid item>
                <IconButton size="small" sx={{ mt: -0.75, mr: -0.75 }} onClick={handleClick} aria-label="more options">
                    <MoreHorizOutlinedIcon
                        fontSize="small"
                        color="inherit"
                        aria-controls="menu-friend-card"
                        aria-haspopup="true"
                        sx={{ opacity: 0.6 }}
                    />
                </IconButton>
                <Menu
                    id="menu-simple-card"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    variant="selectedMenu"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                >
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem onClick={handleClose}>Add Deposit</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
            </Grid>
        </>
    );
};

export default EditMenu;
