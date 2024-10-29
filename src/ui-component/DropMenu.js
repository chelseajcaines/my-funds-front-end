import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const DropMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Grid item>
                <Button
                    variant="text"
                    size="small"
                    sx={{ color: 'grey.900' }}
                    color="inherit"
                    endIcon={<ExpandMoreRoundedIcon />}
                    onClick={handleClick}
                >
                    Week
                </Button>
                {anchorEl && (
                    <Menu
                        id="menu-user-card-style1"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        variant="selectedMenu"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                    >
                        <MenuItem onClick={handleClose}> Week </MenuItem>
                        <MenuItem onClick={handleClose}> Month </MenuItem>
                        <MenuItem onClick={handleClose}> Year </MenuItem>
                    </Menu>
                )}
            </Grid>
        </>
    );
};

export default DropMenu;
