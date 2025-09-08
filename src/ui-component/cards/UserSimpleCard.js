import PropTypes from 'prop-types';
import { format } from 'date-fns';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LinearProgress } from '@mui/material';

// project imports
import { ThemeMode } from 'config';

import { gridSpacing } from 'store/constant';

const DetailsWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(29, 161, 242, 0.2)',
    color: '#1DA1F2',
    '&:hover': {
        background: '#1DA1F2',
        color: '#fff'
    }
});

// ==============================|| USER SIMPLE CARD ||============================== //

const UserSimpleCard = ({ amount, time, date }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: 2,
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : '#E3F2FD',
                border: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <Typography fontSize={{ sm: '2rem', md: '2rem' }} fontWeight="600">
                                ${amount}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>{time}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item sm zeroMinWidth>
                            <Typography variant="body2">Day 4</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" align="right">
                                80%
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <LinearProgress variant="determinate" value={80} color="primary" aria-label='"traffic progress"' />
                        </Grid>
                    </Grid>
                </Grid> */}
                <Grid item xs={12} alignItems="center">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <Typography variant="h4">Start Date: {date ? format(new Date(date), 'MMM. dd/yy') : ''}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <DetailsWrapper fullWidth>
                                <Typography fontSize="small">View Purchases</Typography>
                            </DetailsWrapper>
                        </Grid>
                    </Grid>
                </Grid> */}
            </Grid>
        </Card>
    );
};

UserSimpleCard.propTypes = {
    amount: PropTypes.string,
    time: PropTypes.string,
    date: PropTypes.string
};

export default UserSimpleCard;
