// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons-react';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const banking = {
    id: 'banking',
    title: <FormattedMessage id="Banking" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'cards',
            title: <FormattedMessage id="Cards" />,
            type: 'item',
            url: '/cards',
            icon: CreditCardOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default banking;