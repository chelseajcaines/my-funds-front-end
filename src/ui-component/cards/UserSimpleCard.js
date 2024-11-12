import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// assets
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

// ==============================|| USER SIMPLE CARD ||============================== //

const UserSimpleCard = ({ avatar }) => {
    return (
        <Card>
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
                            <Typography variant="h4">Oct. 20th - Oct. 27th</Typography>
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
    budgetAmount: PropTypes.string,
    budgetStartDate: PropTypes.string
};

export default UserSimpleCard;
