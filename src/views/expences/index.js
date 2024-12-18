import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// project imports
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';

// assets
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import MainCard from 'ui-component/cards/MainCard';

// table data
function createData(category, location, amount, date, payment, statuscolor) {
    return { category, location, amount, date, payment, statuscolor };
}

const rows = [
    createData('Groceries', 'Sobeys', '$80', '17-2-2017', 'Credit', 'warning'),
    createData('Electric Bill', 'NL Power', '$120', '20-2-2017', 'Debit', 'primary'),
    createData('Take Out', 'McDonalds', '$20', '17-2-2017', 'Cash', 'success'),
    createData('Clothing', 'Old Navy', '$30', '25-4-2017', 'Credit', 'warning')
];

// =========================|| LATEST ORDER CARD ||========================= //

export default function Expences() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title="Expences" content={false}>
                    <TableContainer>
                        <Table sx={{ minWidth: 350 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }}>Category</TableCell>
                                    <TableCell align="center">Location</TableCell>
                                    <TableCell align="center">Amount</TableCell>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">Payment Type</TableCell>
                                    <TableCell align="center" sx={{ pr: 3 }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell sx={{ pl: 3 }}>{row.category}</TableCell>
                                        <TableCell align="center">{row.location}</TableCell>
                                        <TableCell align="center">{row.amount}</TableCell>
                                        <TableCell align="center">{row.date}</TableCell>
                                        <TableCell align="center">
                                            <Chip chipcolor={row.statuscolor} label={row.payment} size="small" />
                                        </TableCell>
                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <Stack direction="row" justifyContent="center" alignItems="center">
                                                <IconButton color="primary" size="large" aria-label='"edit"'>
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                                <IconButton color="inherit" size="large" aria-label='"delete"'>
                                                    <DeleteOutlineOutlinedIcon />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="text" size="small">
                            View all Expences
                        </Button>
                    </CardActions>
                </MainCard>
            </Grid>
        </Grid>
    );
}
