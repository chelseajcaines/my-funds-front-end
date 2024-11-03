// material-ui
import Grid from '@mui/material/Grid';
import { useState } from 'react';

import UserSimpleCard from 'ui-component/cards/UserSimpleCard';
import EditMenu from './EditMenu';

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SimpleModal from 'views/forms/SimpleModal';
import { gridSpacing } from 'store/constant';

const simpleCard = {
    id: '#6Card_Joanne',
    avatar: 'avatar-6.png',
    name: 'Joanne',
    status: 'Active'
};

// ===============================|| UI CARDS ||=============================== //

const Budgets = () => {
    const [title, setTitle] = useState('Budgets');
    return (
        <>
            <MainCard title="Budgets" secondary={<SimpleModal />}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={4}>
                        <SubCard title="Groceries" secondary={<EditMenu />}>
                            <UserSimpleCard {...simpleCard} />
                        </SubCard>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default Budgets;
