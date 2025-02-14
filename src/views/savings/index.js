import React, { useState } from 'react';
// material-ui
import Grid from '@mui/material/Grid';
import axios from 'axios';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import SavingsModal from 'views/forms/SavingsModal';
import SavingsSimpleCard from '../savings/SavingsSimpleCard';
import SavingsSubCard from '../savings/SavingsSubCard';
import SavingsEditMenu from 'views/savings/SavingsEditMenu';
import ApexRedialBarChart from './ApexRedialChart';

// ===============================|| UI CARDS ||=============================== //

const Savings = () => {
    const [savings, setSavings] = useState([]);

    // const handleSavingsSubmit = (name, amount, deposit_amount, time, date) => {
    //     const newSavings = { name, amount, deposit_amount, time, date, current_amount: 0 };
    //     setSavings((prevSavings) => [...prevSavings, newSavings]);
    // };

    const handleSavingsSubmit = async (name, amount, deposit_amount, time, date) => {
        try {
            const response = await axios.post('http://localhost:5001/api/savings', {
                name,
                amount,
                deposit_amount,
                time,
                date
            });

            console.log('Savings created:', response.data);
            setSavings((prevSavings) => [...prevSavings, response.data.data]); // Assuming response follows `rest.success`
        } catch (error) {
            console.error('Error creating saving:', error.response?.data || error.message);
        }
    };

    const handleAddDeposit = (index, deposit) => {
        setSavings((prevSavings) => {
            if (!Array.isArray(prevSavings)) {
                console.error('prevSavings is not an array', prevSavings);
                return prevSavings;
            }

            const updatedSavings = [...prevSavings];
            updatedSavings[index].current_amount += parseFloat(deposit); // Add deposit to current_amount
            return updatedSavings;
        });
    };

    return (
        <>
            <MainCard title="Savings" secondary={<SavingsModal onSubmit={handleSavingsSubmit} />}>
                <Grid container spacing={gridSpacing}>
                    {savings.map((saving, index) => (
                        <Grid item xs={12} sm={6} lg={4} key={index}>
                            <SavingsSubCard
                                title={saving.name}
                                secondary={<SavingsEditMenu onAddDeposit={(deposit) => handleAddDeposit(index, deposit)} />}
                            >
                                <ApexRedialBarChart
                                    amount={saving.amount}
                                    deposit_amount={saving.deposit_amount}
                                    time={saving.time}
                                    date={saving.date}
                                    current_amount={saving.current_amount}
                                />
                            </SavingsSubCard>
                        </Grid>
                    ))}
                </Grid>
            </MainCard>
        </>
    );
};

export default Savings;
