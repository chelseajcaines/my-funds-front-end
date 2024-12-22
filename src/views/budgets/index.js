// material-ui
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';

// project imports
import UserSimpleCard from 'ui-component/cards/UserSimpleCard';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import SimpleModal from 'views/forms/SimpleModal';
import EditMenu from './EditMenu';

// ===============================|| UI CARDS ||=============================== //

const Budgets = () => {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        time: 'Weekly',
        date: null
    });

    const updateFormData = (updatedData) => {
        setFormData(updatedData);
    };

    return (
        <MainCard title="Budgets" secondary={<SimpleModal formData={formData} updateFormData={updateFormData} />}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} lg={4}>
                    <SubCard title={formData.name} secondary={<EditMenu />}>
                        <UserSimpleCard formData={formData} />
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Budgets;
