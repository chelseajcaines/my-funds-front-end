//third party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons-react';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const finances = {
    id: 'finances',
    title: <FormattedMessage id="finances" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        // {
        //     id: 'budgets',
        //     title: <FormattedMessage id="Budgets" />,
        //     type: 'item',
        //     url: '/budgets',
        //     icon: BalanceOutlinedIcon,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'income',
        //     title: <FormattedMessage id="Income" />,
        //     type: 'item',
        //     url: '/income',
        //     icon: AttachMoneyOutlinedIcon,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'expenses',
        //     title: <FormattedMessage id="Expenses" />,
        //     type: 'item',
        //     url: '/expenses',
        //     icon: LocalMallOutlinedIcon,
        //     breadcrumbs: false
        // }
        // {
        //     id: 'savings',
        //     title: <FormattedMessage id="Savings" />,
        //     type: 'item',
        //     url: '/savings',
        //     icon: LocalMallOutlinedIcon,
        //     breadcrumbs: false
        // }
    ]
};

export default finances;
