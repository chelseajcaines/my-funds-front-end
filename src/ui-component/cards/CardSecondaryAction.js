import PropTypes from 'prop-types';

// material-ui
import { ButtonBase, Link, Tooltip } from '@mui/material';

// project imports
import Avatar from '../extended/Avatar';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

// ==============================|| CARD SECONDARY ACTION ||============================== //

const CardSecondaryAction = ({ title, link, icon }) => {
    return (
        <Tooltip title={title || 'Add Budget'} placement="left">
            <ButtonBase disableRipple>
                {!icon && (
                    <Avatar
                        component={Link}
                        href={link}
                        target="_blank"
                        alt="Add Budget"
                        size="badge"
                        color="primary"
                        fill
                        aria-label="add"
                    >
                        <AddRoundedIcon fontSize="small" />
                    </Avatar>
                )}
                {icon && <AddRoundedIcon fontSize="small" />}
            </ButtonBase>
        </Tooltip>
    );
};

CardSecondaryAction.propTypes = {
    icon: PropTypes.node,
    link: PropTypes.string,
    title: PropTypes.string
};

export default CardSecondaryAction;
