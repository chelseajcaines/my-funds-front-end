import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexRedialChart = () => {
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
                        formatter: () => '$12,120' // Customize the displayed value
                    }
                }
            }
        },
        colors: ['#2196F3'], // Set a single color for the bar
        labels: ['/ 50000'] // This label applies to the "name"
    };

    const series = [70]; // Value for the radial bar (percentage)

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="radialBar" height={250} />
        </div>
    );
};

export default ApexRedialChart;
