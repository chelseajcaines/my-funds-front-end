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
    return (
        <>
            <MainCard title="Budgets" secondary={<SimpleModal />}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={4}>
                        <SubCard title="Groceries" secondary={<EditMenu />}>
                            <UserSimpleCard />
                        </SubCard>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default Budgets;
