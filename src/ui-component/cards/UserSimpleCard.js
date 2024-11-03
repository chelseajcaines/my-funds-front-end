import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, Chip, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import Avatar from '../extended/Avatar';
import { gridSpacing } from 'store/constant';

// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const avatarImage = require.context('assets/images/users', true);

function LinearProgressWithLabel({ value, ...others }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    mr: 1
                }}
            >
                <LinearProgress value={value} {...others} />
            </Box>
            <Box
                sx={{
                    minWidth: 35
                }}
            >
                <Typography variant="body2" color="textSecondary">{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number
};

// styles
const FacebookWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(66, 103, 178, 0.2)',
    '& svg': {
        color: '#4267B2'
    },
    '&:hover': {
        background: '#4267B2',
        '& svg': {
            color: '#fff'
        }
    }
});

const TwitterWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(29, 161, 242, 0.2)',
    '& svg': {
        color: '#1DA1F2'
    },
    '&:hover': {
        background: '#1DA1F2',
        '& svg': {
            color: '#fff'
        }
    }
});

const LinkedInWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(14, 118, 168, 0.12)',
    '& svg': {
        color: '#0E76A8'
    },
    '&:hover': {
        background: '#0E76A8',
        '& svg': {
            color: '#fff'
        }
    }
});

// ==============================|| USER SIMPLE CARD ||============================== //

const UserSimpleCard = ({ avatar }) => {
    const theme = useTheme();
    const avatarProfile = avatar && avatarImage(`./${avatar}`);

    return (
        <Card
        // sx={{
        //     p: 2,
        //     background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        //     border: '1px solid',
        //     borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
        //     '&:hover': {
        //         border: `1px solid${theme.palette.primary.main}`
        //     }
        // }}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <Typography variant="h1">$200</Typography>
                            <LinearProgressWithLabel color="primary" variant="determinate" value={70} aria-label="junior-skill-progress" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} alignItems="center">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth display={'flex'} justifyContent={'space-between'}>
                            <Typography variant="h4">Day 4</Typography>
                            <Typography variant="h4">Oct. 20th - Oct. 26th</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button variant="contained">View Purchases</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

UserSimpleCard.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string
};

export default UserSimpleCard;
