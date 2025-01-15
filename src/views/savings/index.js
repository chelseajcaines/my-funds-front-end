import React, { useState } from 'react';
// material-ui
import Grid from '@mui/material/Grid';

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

    const handleSavingsSubmit = (name, amount, deposit_amount, time, date) => {
        const newSavings = { name, amount, deposit_amount, time, date };
        setSavings((prevSavings) => [...prevSavings, newSavings]);
    };

    return (
        <>
            <MainCard title="Savings" secondary={<SavingsModal onSubmit={handleSavingsSubmit} />}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <SavingsSubCard title="New House" secondary={<SavingsEditMenu />}>
                            <ApexRedialBarChart />
                        </SavingsSubCard>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default Savings;
