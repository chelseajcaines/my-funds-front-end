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
                        show: true, // Show the name label
                        fontSize: '30px',
                        fontWeight: 600,
                        offsetY: -10, // Adjust the position of the name label
                        color: '#000'
                    }
                    // value: {
                    //     show: true, // Show only the value
                    //     fontSize: '20px',
                    //     fontWeight: 600
                    // }
                }
            }
        },
        colors: ['#2196F3'], // Set a single color for the bar
        labels: ['$12,120'] // Set the name displayed in the chart
    };

    const series = [70]; // Value for the radial bar (percentage)

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="radialBar" height={250} />
        </div>
    );
};

export default ApexRedialChart;
