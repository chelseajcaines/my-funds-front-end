import React, { useState } from 'react';
// material-ui
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import IncomeModal from 'views/forms/IncomeModal';
import IncomeSimpleCard from '../income/IncomeSimpleCard';
import IncomeSubCard from '../income/IncomeSubCard';
import IncomeEditMenu from 'views/income/IncomeEditMenu';

// ===============================|| UI CARDS ||=============================== //

const Income = () => {
    const [incomes, setIncomes] = useState([]);

    const handleIncomeSubmit = (name, amount, time, date, position) => {
        const newIncome = { name, amount, time, date, position };
        setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    };

    return (
        <>
            <MainCard title="Income" secondary={<IncomeModal onSubmit={handleIncomeSubmit} />}>
                <Grid container spacing={gridSpacing}>
                    {incomes.map((income, index) => (
                        <Grid item xs={12} sm={6} lg={4} key={index}>
                            <IncomeSubCard title={income.name} secondary={<IncomeEditMenu />}>
                                <IncomeSimpleCard amount={income.amount} time={income.time} date={income.date} position={income.position} />
                            </IncomeSubCard>
                        </Grid>
                    ))}
                </Grid>
            </MainCard>
        </>
    );
};

export default Income;
