import { useState } from 'react';
import Grid from '@mui/material/Grid';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { IconButton, Menu, MenuItem } from '@mui/material';
// import axios from 'axios';
import PropTypes from 'prop-types';

const EditMenu = ({ onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        handleClose();
        onDelete(); // call the passed in onDelete function
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
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
            </Grid>
        </>
    );
};

export default EditMenu;

EditMenu.propTypes = {
    onDelete: PropTypes.func.isRequired // Expect a function for the delete handler
};

// budgetId: PropTypes.number.isRequired, // Expect a number for the budget ID

// const handleDelete = async () => {
//     console.log('Attempting to delete budget with id:', budgetId); // Log to check the process
//     try {
//         // Make DELETE request
//         await axios.delete(`http://localhost:5001/api/budget/${budgetId}`, {
//             withCredentials: true
//         });

//         // After the budget is deleted from the backend, call onDelete to update the frontend state
//         onDelete(budgetId); // Remove from frontend (passed from parent)
//     } catch (error) {
//         console.error('Failed to delete budget:', error.response?.data || error.message);
//     } finally {
//         handleClose(); // Close the menu after the operation
//     }
// };
