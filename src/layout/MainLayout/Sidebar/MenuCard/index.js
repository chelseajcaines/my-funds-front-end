import PropTypes from 'prop-types';
import { memo } from 'react';
import { Box, Link } from '@mui/material';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Card, CardContent, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styles
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 30,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.light : '#fff'
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main
    }
}));

const CardStyle = styled(Card)(({ theme }) => ({
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
    marginBottom: '22px',
    overflow: 'hidden',
    position: 'relative'
    // '&:after': {
    //     content: '""',
    //     position: 'absolute',
    //     width: '157px',
    //     height: '157px',
    //     background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.primary[200],
    //     borderRadius: '50%',
    //     top: '-105px',
    //     right: '-96px'
    // }
}));

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
    const theme = useTheme();

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <Typography variant="h6" color="inherit">
                    &copy; 2025 MonieJar
                </Typography>
            </Grid>
        </Grid>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number
};

// ==============================|| SIDEBAR - MENU CARD ||============================== //

const MenuCard = () => {
    const theme = useTheme();

    return (
        <CardStyle>
            <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <List sx={{ p: 0, m: 0 }}>
                    <ListItem alignItems="center" disableGutters sx={{ p: 0 }}>
                        {/* <ListItemAvatar sx={{ mt: 0 }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.largeAvatar,
                                    color: theme.palette.primary.main,
                                    border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
                                    borderColor: theme.palette.primary.main,
                                    background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : '#fff',
                                    marginRight: '12px'
                                }}
                            >
                                <TableChartOutlinedIcon fontSize="inherit" />
                            </Avatar>
                        </ListItemAvatar> */}
                        <ListItemText
                            sx={{ mt: 0 }}
                            primary={
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.primary[800] }}
                                >
                                    Developed by Chelsea Caines
                                </Typography>
                            }
                            secondary={
                                <Box display="flex" justifyContent="center">
                                    <Typography
                                        variant="subtitle2"
                                        component={Link}
                                        href="https://www.linkedin.com/in/chelsea-caines/"
                                        target="_blank"
                                        underline="hover"
                                        paddingRight="3px"
                                    >
                                        LinkedIn |
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        component={Link}
                                        href="https://github.com/chelseajcaines"
                                        target="_blank"
                                        underline="hover"
                                        paddingRight="3px"
                                    >
                                        GitHub |
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        component={Link}
                                        href="https://app.getcoding.ca/reviews/chelsea-caines/"
                                        target="_blank"
                                        underline="hover"
                                    >
                                        GetBuilding
                                    </Typography>
                                </Box>
                            }
                        />
                    </ListItem>
                </List>
                <LinearProgressWithLabel value={80} />
            </CardContent>
        </CardStyle>
    );
};

export default memo(MenuCard);
