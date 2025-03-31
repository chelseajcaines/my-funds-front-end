import React, { useState } from 'react';
// material-ui
import Grid from '@mui/material/Grid';
import axios from 'axios';

// project imports
import UserSimpleCard from 'ui-component/cards/UserSimpleCard';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import SimpleModal from 'views/forms/SimpleModal';
import EditMenu from './EditMenu';

// ===============================|| UI CARDS ||=============================== //

const Budgets = () => {
    const [budgets, setBudgets] = useState([]);

    const handleBudgetSubmit = async (name, amount, time, date) => {
        try {
            const response = await axios.post(
                'http://localhost:5001/api/budget',
                {
                    name,
                    amount,
                    time,
                    date
                },
                {
                    withCredentials: true // ✅ Ensures JWT cookie is sent
                }
            );

            console.log('Budget created:', response.data);
            setBudgets((prevBudgets) => [...prevBudgets, response.data.data]);
        } catch (error) {
            console.error('Error creating budget:', error.response?.data || error.message);
        }
    };

    return (
        <>
            <MainCard title="Budgets" secondary={<SimpleModal onSubmit={handleBudgetSubmit} />}>
                <Grid container spacing={gridSpacing}>
                    {budgets.map((budget, index) => (
                        <Grid item xs={12} sm={6} lg={4} key={index}>
                            <SubCard title={budget.name} secondary={<EditMenu />}>
                                <UserSimpleCard amount={budget.amount} time={budget.time} date={budget.date} />
                            </SubCard>
                        </Grid>
                    ))}
                </Grid>
            </MainCard>
        </>
    );
};

export default Budgets;
