import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Typography from '@mui/material/Typography'; // Import Typography from Material-UI (if using Material-UI)
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const SavingsWrapper = styled(Button)({
    padding: 8,
    marginTop: '15px',
    background: 'rgba(29, 161, 242, 0.2)',
    color: '#1DA1F2',
    '&:hover': {
        background: '#1DA1F2',
        color: '#fff'
    }
});

const ApexRadialChart = ({ amount, deposit_amount, time, date }) => {
    const options = {
        chart: {
            type: 'radialBar'
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%' // Adjust the hollow size as needed
                },
                dataLabels: {
                    name: {
                        show: true, // Show the word "goal"
                        fontSize: '20px',
                        fontWeight: 400,
                        offsetY: 30, // Position the word below the value
                        color: '#000'
                    },
                    value: {
                        show: true, // Show the amount
                        fontSize: '40px',
                        fontWeight: 600,
                        offsetY: -10, // Position the amount
                        color: '#000',
                        formatter: () => '$12,000'
                    }
                }
            }
        },
        colors: ['#2196F3'], // Set a single color for the bar
        labels: ['/' + ' ' + '$' + amount] // This label applies to the "name"
    };

    const series = [70]; // Value for the radial bar (percentage)

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="radialBar" height={250} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" style={{ color: '#333' }}>
                    Start Date: {date}
                </Typography>
                <Typography variant="h6" style={{ color: '#333' }}>
                    Ideal Deposit Amount: ${deposit_amount} {time}
                </Typography>
            </div>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SavingsWrapper fullWidth>
                            <Typography fontSize="small">View Deposits</Typography>
                        </SavingsWrapper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

ApexRadialChart.propTypes = {
    amount: PropTypes.string,
    deposit_amount: PropTypes.string,
    time: PropTypes.string,
    date: PropTypes.string
};

export default ApexRadialChart;
