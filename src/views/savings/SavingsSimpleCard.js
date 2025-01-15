import PropTypes from 'prop-types';

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

const SavingsWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(29, 161, 242, 0.2)',
    color: '#1DA1F2',
    '&:hover': {
        background: '#1DA1F2',
        color: '#fff'
    }
});

// ==============================|| USER SIMPLE CARD ||============================== //

const SavingsSimpleCard = ({ amount, deposit_amount, time, date }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: 2,
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.50',
                border: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <Typography variant="h1">${amount}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>{time}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} justifyContent="space-between">
                        <Grid item>
                            <Typography>Start Date: {date}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>${deposit_amount}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SavingsWrapper fullWidth>
                                <Typography fontSize="small">View Deposits</Typography>
                            </SavingsWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

SavingsSimpleCard.propTypes = {
    amount: PropTypes.string,
    deposit_amount: PropTypes.string,
    time: PropTypes.string,
    date: PropTypes.string
};

export default SavingsSimpleCard;