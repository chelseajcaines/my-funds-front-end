import React, { useState, useEffect } from 'react';
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

    // Fetch budgets when the component mounts
    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/budget', {
                    withCredentials: true // Ensures JWT token is sent with the request
                });

                console.log('Fetched budgets:', response.data);
                setBudgets(response.data.data); // Assuming response.data contains a `data` field
            } catch (error) {
                console.error('Error fetching budgets:', error.response?.data || error.message);
            }
        };

        fetchBudgets();
    }, []); // Empty dependency array means this runs only once when the component mounts

    const handleBudgetSubmit = async (name, amount, time, date) => {
        try {
            const response = await axios.post(
                'http://localhost:5001/api/budget',
                { name, amount, time, date },
                { withCredentials: true } // Ensures cookies are sent with the request
            );

            console.log('Budget created:', response.data);
            setBudgets((prevBudgets) => [...prevBudgets, response.data.data]); // Assuming response follows `rest.success`
        } catch (error) {
            if (error.response?.status === 401) {
                console.error('Unauthorized: Please log in again');
                // Redirect user to login page (if applicable)
            } else {
                console.error('Error creating budget:', error.response?.data || error.message);
            }
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
