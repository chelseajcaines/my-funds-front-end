// material-ui
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import IncomeModal from 'views/forms/IncomeModal';
import UserSimpleCard from 'ui-component/cards/UserSimpleCard';
import SubCard from 'ui-component/cards/SubCard';
import EditMenu from 'views/budgets/EditMenu';

// ===============================|| UI CARDS ||=============================== //

const Income = () => {
    return (
        <>
            <MainCard title="Income" secondary={<IncomeModal />}>
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

export default Income;
