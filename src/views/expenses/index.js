import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ExpensesModal from 'views/forms/ExpensesModal';
import { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

// project imports
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';

// assets
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import MainCard from 'ui-component/cards/MainCard';

// table data
function createData(category, location, amount, date, payment, deduction, statuscolor) {
    return { category, location, amount, date, payment, deduction, statuscolor };
}

// =========================|| LATEST ORDER CARD ||========================= //

export default function Expenses() {
    const [expenseCard, setExpenseCard] = useState(false);

    const [rows, setRows] = useState([]);

    // const handleIncomeSubmit = async (name, amount, time, date, position) => {
    //     try {
    //         const response = await axios.post('http://localhost:5001/api/income', {
    //             name,
    //             amount,
    //             time,
    //             date,
    //             position
    //         });

    //         console.log('Income created:', response.data);
    //         setIncomes((prevIncomes) => [...prevIncomes, response.data.data]); // Assuming response follows `rest.success`
    //     } catch (error) {
    //         console.error('Error creating income:', error.response?.data || error.message);
    //     }
    // };

    const handleExpenseSubmit = async (category, location, amount, date, payment, deduction) => {
        let statuscolor;
        switch (payment.toLowerCase()) {
            case 'debit':
                statuscolor = 'primary'; // Replace 'primary' with your desired color
                break;
            case 'credit':
                statuscolor = 'secondary'; // Replace 'secondary' with your desired color
                break;
            case 'cash':
                statuscolor = 'success'; // Replace 'success' with your desired color
                break;
            default:
                statuscolor = 'warning'; // Default color for undefined payment types
        }

        const formattedDate = date ? format(new Date(date), 'yyyy-MM-dd') : '';

        try {
            const response = await axios.post('http://localhost:5001/api/expense', {
                category,
                location,
                amount,
                date: formattedDate,
                payment,
                deduction
            });

            console.log('Expense created:', response.data);

            // Update the UI with the new expense
            const newRow = createData(
                response.data.data.category,
                response.data.data.location,
                response.data.data.amount,
                response.data.data.date,
                response.data.data.payment,
                response.data.data.deduction
            );

            setRows((prevRows) => [...prevRows, newRow]);
            setExpenseCard(true);
        } catch (error) {
            console.error('Error creating expense:', error.response?.data || error.message);
        }

        // const newRow = createData(category, location, amount, date, payment, deduction, statuscolor);
        // setRows((prevRows) => [...prevRows, newRow]);
        // setExpenseCard(true);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title="Expenses" content={false} secondary={<ExpensesModal onSubmit={handleExpenseSubmit} />}>
                    <TableContainer>
                        <Table sx={{ minWidth: 350 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }}>Category</TableCell>
                                    <TableCell align="center">Location</TableCell>
                                    <TableCell align="center">Amount</TableCell>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">Payment Type</TableCell>
                                    <TableCell align="center">Budget Deduction</TableCell>
                                    <TableCell align="center" sx={{ pr: 3 }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {expenseCard && (
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell sx={{ pl: 3 }}>{row.category}</TableCell>
                                            <TableCell align="center">{row.location}</TableCell>
                                            <TableCell align="center">{row.amount}</TableCell>
                                            <TableCell align="center">{row.date ? format(new Date(row.date), 'MMM. dd/yy') : ''}</TableCell>
                                            <TableCell align="center">
                                                <Chip chipcolor={row.statuscolor} label={row.payment} size="small" />
                                            </TableCell>
                                            <TableCell align="center">{row.deduction}</TableCell>
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
                            )}
                        </Table>
                    </TableContainer>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="text" size="small">
                            View all Expenses
                        </Button>
                    </CardActions>
                </MainCard>
            </Grid>
        </Grid>
    );
}
