import React, { useState } from 'react';
// material-ui
import Grid from '@mui/material/Grid';

// project imports
import UserSimpleCard from 'ui-component/cards/UserSimpleCard';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import SimpleModal from 'views/forms/SimpleModal';
import EditMenu from './EditMenu';

// ===============================|| UI CARDS ||=============================== //

const Budgets = () => {
    const [budgetName, setBudgetName] = useState('');
    const [budgetAmount, setBudgetAmount] = useState('');
    const [budgetTime, setBudgetTime] = useState('');
    // const [budgetDate, setBudgetDate] = useState('');

    const handleBudgetSubmit = (name, amount, time) => {
        setBudgetName(name);
        setBudgetAmount(amount);
        setBudgetTime(time);
        // setBudgetDate(date);
    };
    return (
        <>
            <MainCard title="Budgets" secondary={<SimpleModal onSubmit={handleBudgetSubmit} />}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={4}>
                        <SubCard title={budgetName} secondary={<EditMenu />}>
                            <UserSimpleCard amount={budgetAmount} time={budgetTime} />
                        </SubCard>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default Budgets;
