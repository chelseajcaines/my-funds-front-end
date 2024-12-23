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
import { display } from '@mui/system';

// ===============================|| UI CARDS ||=============================== //

const Budgets = () => {
    const [budgetCard, setBudgetCard] = useState(false);

    const [budgetName, setBudgetName] = useState('');
    const [budgetAmount, setBudgetAmount] = useState('');
    const [budgetTime, setBudgetTime] = useState('');
    const [budgetDate, setBudgetDate] = useState('');

    const handleBudgetSubmit = (name, amount, time, date) => {
        setBudgetName(name);
        setBudgetAmount(amount);
        setBudgetTime(time);
        setBudgetDate(date);
        setBudgetCard(true);
    };

    return (
        <>
            <MainCard title="Budgets" secondary={<SimpleModal onSubmit={handleBudgetSubmit} />}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={4}>
                        {budgetCard && (
                            <SubCard title={budgetName} secondary={<EditMenu />}>
                                <UserSimpleCard amount={budgetAmount} time={budgetTime} date={budgetDate} />
                            </SubCard>
                        )}
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default Budgets;
