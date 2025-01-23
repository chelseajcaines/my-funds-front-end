import { useState } from 'react';
import Grid from '@mui/material/Grid';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AddDepositModal from 'views/forms/AddDepositModal'; // Adjust the import as necessary

const SavingsEditMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddDeposit = () => {
        setIsModalOpen(true); // Open the modal
        handleClose(); // Close the menu
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // Close the modal
    };

    const handleSubmit = (name, amount, time, date) => {
        // Handle form submission here
        console.log('Submitted values:', { name, amount, time, date });
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
                    <MenuItem onClick={handleAddDeposit}>Add Deposit</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
            </Grid>

            {/* Add Deposit Modal */}
            <AddDepositModal open={isModalOpen} onClose={handleModalClose} onSubmit={handleSubmit} />
        </>
    );
};

export default SavingsEditMenu;
