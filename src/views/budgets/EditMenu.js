import { useState } from 'react';
import Grid from '@mui/material/Grid';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { IconButton, Menu, MenuItem } from '@mui/material';
// import axios from 'axios';
import PropTypes from 'prop-types';
import SimpleEditModal from 'views/forms/SimpleEditModal';

const EditMenu = ({ onDelete, budget, onUpdate }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

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

    const handleEdit = () => {
        setEditModalOpen(true);
        handleClose();
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
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
                {editModalOpen && (
                    <SimpleEditModal
                        open={editModalOpen}
                        handleClose={() => setEditModalOpen(false)}
                        budget={budget}
                        onSubmit={(updatedBudget) => {
                            onUpdate(updatedBudget);
                            setEditModalOpen(false);
                        }}
                    />
                )}
            </Grid>
        </>
    );
};

export default EditMenu;

EditMenu.propTypes = {
    onDelete: PropTypes.func.isRequired, // Expect a function for the delete handler
    budget: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
};
