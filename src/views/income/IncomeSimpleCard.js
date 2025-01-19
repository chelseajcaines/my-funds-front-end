import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import { ThemeMode } from 'config';

import { gridSpacing } from 'store/constant';

const DepositsWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(29, 161, 242, 0.2)',
    color: '#1DA1F2',
    '&:hover': {
        background: '#1DA1F2',
        color: '#fff'
    }
});

// ==============================|| USER SIMPLE CARD ||============================== //

const IncomeSimpleCard = ({ amount, time, date, position }) => {
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
                            <Typography>{position}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} alignItems="center">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <Typography variant="h4">Current Pay Period: Dec. 1 - Dec. 15</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <DepositsWrapper fullWidth>
                                <Typography fontSize="small">View Deposits</Typography>
                            </DepositsWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

IncomeSimpleCard.propTypes = {
    amount: PropTypes.string,
    time: PropTypes.string,
    date: PropTypes.string,
    position: PropTypes.string
};

export default IncomeSimpleCard;
