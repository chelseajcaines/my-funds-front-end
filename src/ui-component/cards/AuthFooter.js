// material-ui
import { Link, Typography, Stack } from '@mui/material';
import { Box } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Box display="flex">
            <Typography variant="subtitle2" paddingRight="3px">
                Developed by Chelsea Caines |
            </Typography>
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

        <Typography variant="subtitle2">&copy; 2025 MonieJar</Typography>
    </Stack>
);

export default AuthFooter;
