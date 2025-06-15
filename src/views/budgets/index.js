import React, { useState, useEffect } from 'react';
// material-ui
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { format } from 'date-fns';

// project imports
import UserSimpleCard from 'ui-component/cards/UserSimpleCard';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import SimpleModal from 'views/forms/SimpleModal';
import EditMenu from './EditMenu';
import { fontSize } from '@mui/system';

// ===============================|| UI CARDS ||=============================== //

const Budgets = () => {
    const [budgets, setBudgets] = useState([]);

    // Fetch budgets when the component mounts
    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/budget`, {
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
                `${process.env.REACT_APP_API_URL}/api/budget`,
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

    const handleBudgetDelete = async (id) => {
        console.log('Deleting budget with id:', id); // Log the budget ID being deleted

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/budget/${id}`, {
                withCredentials: true
            });

            // Re-fetch budgets after successful deletion
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/budget`, {
                withCredentials: true
            });

            setBudgets(response.data.data); // Assuming response contains updated budgets
            console.log('Budget deleted:', id);
        } catch (error) {
            console.error('Error deleting budget:', error.response?.data || error.message);
        }
    };

    const handleBudgetUpdate = async (updatedBudget) => {
        console.log('Updated Budget:', updatedBudget);
        const { id, name, amount, time, date } = updatedBudget;
        console.log('Updating budget with Id:', id);

        try {
            const formattedDate = date ? format(new Date(date), 'yyyy-MM-dd') : '';

            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/budget/${id}`,
                {
                    name,
                    amount,
                    time,
                    date: formattedDate
                },
                { withCredentials: true }
            );

            console.log('Budget updated:', response.data);

            // Option 1: Refresh the list
            const fetchUpdatedBudget = await axios.get(`${process.env.REACT_APP_API_URL}/api/budget`, {
                withCredentials: true
            });

            setBudgets(fetchUpdatedBudget.data.data);
        } catch (error) {
            console.error('Error updating budget:', error.response?.data || error.message);
        }
    };

    return (
        <>
            <MainCard title="Budgets" secondary={<SimpleModal onSubmit={handleBudgetSubmit} />}>
                <Grid container spacing={gridSpacing}>
                    {budgets.map((budget, index) => (
                        <Grid item xs={12} sm={6} lg={4} key={index}>
                            <SubCard
                                title={budget.name}
                                secondary={
                                    <EditMenu
                                        onDelete={() => handleBudgetDelete(budget.id)}
                                        budget={budget}
                                        onUpdate={(updatedBudget) => handleBudgetUpdate({ ...budget, ...updatedBudget })}
                                    />
                                }
                            >
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
