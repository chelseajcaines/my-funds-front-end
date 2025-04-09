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
import ExpensesEditModal from 'views/forms/ExpensesEditModal';
import { useState, useEffect } from 'react';
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
    const [expense, setExpense] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/expense', {
                    withCredentials: true // Ensures JWT token is sent with the request
                });

                console.log('Fetched expense:', response.data);
                setExpense(response.data.data); // Assuming response.data contains a `data` field
            } catch (error) {
                console.error('Error fetching expense:', error.response?.data || error.message);
            }
        };

        fetchExpense();
    }, []);

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
            const response = await axios.post(
                'http://localhost:5001/api/expense',
                {
                    category,
                    location,
                    amount,
                    date: formattedDate,
                    payment,
                    deduction
                },
                { withCredentials: true }
            );

            console.log('Expense created:', response.data);

            // Update the UI with the new expense
            // const newRow = createData(
            //     response.data.data.category,
            //     response.data.data.location,
            //     response.data.data.amount,
            //     response.data.data.date,
            //     response.data.data.payment,
            //     response.data.data.deduction
            // );

            setExpense((prevExpense) => [...prevExpense, response.data.data]);
        } catch (error) {
            if (error.response?.status === 401) {
                console.error('Unauthorized: Please log in again');
                // Redirect user to login page (if applicable)
            } else {
                console.error('Error creating expense:', error.response?.data || error.message);
            }
        }
    };

    const handleExpenseDelete = async (id) => {
        console.log('Deleting expense with id:', id); // Log the budget ID being deleted

        try {
            await axios.delete(`http://localhost:5001/api/expense/${id}`, {
                withCredentials: true
            });

            const response = await axios.get('http://localhost:5001/api/expense', {
                withCredentials: true
            });

            setExpense(response.data.data);
            console.log('Expense deleted:', id);
        } catch (error) {
            console.error('Error deleting expense:', error.response?.data || error.message);
        }
    };

    const handleEditClick = () => {
        setEditModalOpen(true);
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
                            {expense.map((expense, index) => (
                                <TableBody key={index}>
                                    <TableRow hover>
                                        <TableCell sx={{ pl: 3 }}>{expense.category}</TableCell>
                                        <TableCell align="center">{expense.location}</TableCell>
                                        <TableCell align="center">{expense.amount}</TableCell>
                                        <TableCell align="center">
                                            {expense.date ? format(new Date(expense.date), 'MMM. dd/yy') : ''}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip chipcolor={expense.statuscolor} label={expense.payment} size="small" />
                                        </TableCell>
                                        <TableCell align="center">{expense.deduction}</TableCell>
                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <Stack direction="row" justifyContent="center" alignItems="center">
                                                <IconButton
                                                    color="primary"
                                                    size="large"
                                                    aria-label='"edit"'
                                                    onClick={() => handleEditClick()}
                                                >
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="inherit"
                                                    size="large"
                                                    aria-label='"delete"'
                                                    onClick={() => handleExpenseDelete(expense.id)}
                                                >
                                                    <DeleteOutlineOutlinedIcon />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                        </Table>
                    </TableContainer>
                    {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="text" size="small">
                            View all Expenses
                        </Button>
                    </CardActions> */}
                </MainCard>
                {editModalOpen && (
                    <ExpensesEditModal
                        open={editModalOpen}
                        handleClose={() => setEditModalOpen(false)}
                        // onSubmit={handleUpdateExpense}
                    />
                )}
            </Grid>
        </Grid>
    );
}
