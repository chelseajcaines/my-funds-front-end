// material-ui
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import IncomeModal from 'views/forms/IncomeModal';
import IncomeSimpleCard from '../income/IncomeSimpleCard';
import IncomeSubCard from '../income/IncomeSubCard';
import IncomeEditMenu from 'views/budgets/EditMenu';

// ===============================|| UI CARDS ||=============================== //

const Income = () => {
    return (
        <>
            <MainCard title="Income" secondary={<IncomeModal />}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={4}>
                        <IncomeSubCard title="Eastern Health" secondary={<IncomeEditMenu />}>
                            <IncomeSimpleCard />
                        </IncomeSubCard>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default Income;
