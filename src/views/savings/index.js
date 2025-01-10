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

// ===============================|| UI CARDS ||=============================== //

const Savings = () => {
    const [savings, setSavings] = useState([]);

    const handleSavingsSubmit = (name, amount, time, date, position) => {
        const newSavings = { name, amount, time, date, position };
        setSavings((prevSavings) => [...prevSavings, newSavings]);
    };

    return (
        <>
            <MainCard title="Savings" secondary={<SavingsModal onSubmit={handleSavingsSubmit} />}>
                <Grid container spacing={gridSpacing}>
                    {savings.map((saving, index) => (
                        <Grid item xs={12} sm={6} lg={4} key={index}>
                            <SavingsSubCard title={saving.name} secondary={<SavingsEditMenu />}>
                                <SavingsSimpleCard
                                    amount={saving.amount}
                                    time={saving.time}
                                    date={saving.date}
                                    position={saving.position}
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
