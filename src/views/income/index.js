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
    const [incomeCard, setIncomeCard] = useState(false);

    const [incomeName, setIncomeName] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [incomeTime, setIncomeTime] = useState('');
    const [incomeDate, setIncomeDate] = useState('');
    const [incomePosition, setIncomePosition] = useState('');

    const handleIncomeSubmit = (name, amount, time, date, position) => {
        setIncomeName(name);
        setIncomeAmount(amount);
        setIncomeTime(time);
        setIncomeDate(date);
        setIncomePosition(position);
        setIncomeCard(true);
    };

    return (
        <>
            <MainCard title="Income" secondary={<IncomeModal onSubmit={handleIncomeSubmit} />}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={4}>
                        {incomeCard && (
                            <IncomeSubCard title={incomeName} secondary={<IncomeEditMenu />}>
                                <IncomeSimpleCard amount={incomeAmount} time={incomeTime} date={incomeDate} position={incomePosition} />
                            </IncomeSubCard>
                        )}
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default Income;
