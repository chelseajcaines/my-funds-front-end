// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons-react';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'budgets',
            title: <FormattedMessage id="Budgets" />,
            type: 'item',
            url: '/budgets',
            icon: BalanceOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'expenses',
            title: <FormattedMessage id="Expenses" />,
            type: 'item',
            url: '/expenses',
            icon: LocalMallOutlinedIcon,
            breadcrumbs: false
        }
        // {
        //     id: 'overview',
        //     title: <FormattedMessage id="Overview" />,
        //     type: 'item',
        //     url: '/overview',
        //     icon: icons.IconDashboard,
        //     breadcrumbs: false
        // }
    ]
};

export default dashboard;
