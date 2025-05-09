import PropTypes from 'prop-types';

import React from 'react';

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// project-import
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// ==============================|| CUSTOM SUB CARD ||============================== //

const SubCard = React.forwardRef(
    ({ children, content, contentClass, darkTitle, secondary, sx = {}, contentSX = {}, title, ...others }, ref) => {
        const { mode } = useConfig();
        const defaultShadow = mode === ThemeMode.DARK ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)';

        return (
            <Card ref={ref} sx={{ border: '1px solid', borderColor: 'divider', ':hover': { boxShadow: defaultShadow }, ...sx }} {...others}>
                {/* card header and action */}
                {!darkTitle && title && (
                    <CardHeader
                        sx={{ p: 2.5, backgroundColor: '#b4dbf7' }}
                        title={
                            <Typography variant="h3" color="#2259a5">
                                {title}
                            </Typography>
                        }
                        action={secondary}
                    />
                )}
                {darkTitle && title && (
                    <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h4">{title}</Typography>} action={secondary} />
                )}

                {/* content & header divider */}
                {title && <Divider />}

                {/* card content */}
                {content && (
                    <CardContent sx={{ p: 2.5, ...contentSX, backgroundColor: '#f4f9fc' }} className={contentClass || ''}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

SubCard.propTypes = {
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    sx: PropTypes.object,
    contentSX: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

SubCard.defaultProps = {
    content: true
};

export default SubCard;
