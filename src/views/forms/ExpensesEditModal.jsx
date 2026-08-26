import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'store';
import { useFormik } from 'formik';
import { format } from 'date-fns';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

// material-ui
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as yup from 'yup';
import { openSnackbar } from 'store/slices/snackbar';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import InputLabel from 'ui-component/extended/Form/InputLabel';

// assets
import CloseIcon from '@mui/icons-material/Close';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

// generate random
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

// modal position
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const PAYMENT_TYPE = {
    CREDIT: 'Credit',
    DEBIT: 'Debit',
    CASH: 'Cash'
};

const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
];

const currentYear = new Date().getFullYear();

const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

const getDaysInMonth = (month) => {
    const monthNumber = Number(month);

    if (!monthNumber) return 31;
    if (monthNumber === 2) return 29;

    const thirtyDayMonths = [4, 6, 9, 11];
    if (thirtyDayMonths.includes(monthNumber)) return 30;

    return 31;
};

const DEDUCT_BUDGET = {
    NONE: 'None'
};

const validationSchema = yup.object({
    category: yup.string().required('Category is required.'),
    location: yup.string().required('Location is required.'),
    amount: yup
        .string()
        .required('Max Amount is required.')
        .test('is-valid-number', 'Amount must be a number.', (value) => {
            if (!value) return false;
            const parsed = parseFloat(value.replace(/,/g, ''));
            return !isNaN(parsed);
        })
        .test('is-positive', 'Amount must be a positive number.', (value) => {
            if (!value) return false;
            const parsed = parseFloat(value.replace(/,/g, ''));
            return parsed > 0;
        }),
    month: yup.number().required('Month is required.'),
    day: yup.number().required('Day is required.'),
    year: yup.number().required('Year is required.'),
    // date: yup.date().typeError('Date is required.').required('Date is required.'),
    payment: yup
        .string()
        .oneOf([PAYMENT_TYPE.CREDIT, PAYMENT_TYPE.DEBIT, PAYMENT_TYPE.CASH], 'Invalid selection for Payment Type.')
        .required('Payment Type selection is required.'),
    deduction: yup
        .string()
        .oneOf([DEDUCT_BUDGET.NONE], 'Invalid selection for Deduct from Budget.')
        .required('Please choose a budget or None')
});

const Body = React.forwardRef(({ modalStyle, handleClose, onSubmit, expense }, ref) => {
    const dispatch = useDispatch();

    const expenseDate = expenses?.date ? String(expenses.date).slice(0, 10).split('-') : [];

    const expenseYear = expenseDate.length === 3 ? Number(expenseDate[0]) : '';

    const expenseMonth = expenseDate.length === 3 ? Number(expenseDate[1]) : '';

    const expenseDay = expenseDate.length === 3 ? Number(expenseDate[2]) : '';

    const formik = useFormik({
        initialValues: {
            category: expense?.category || '',
            location: expense?.location || '',
            amount: expense?.amount
                ? Number(expense.amount).toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                  })
                : '',
            month: expenseMonth,
            day: expenseDay,
            year: expenseYear,
            // date: expense?.date || null,
            payment: expense?.payment || PAYMENT_TYPE.DEBIT,
            deduction: expense?.deduction || DEDUCT_BUDGET.NONE
        },
        enableReinitialize: true,

        validationSchema,
        onSubmit: (values) => {
            const cleanedAmount = parseFloat(values.amount.replace(/,/g, ''));
            const formattedDate = `${values.year}-${String(values.month).padStart(2, '0')}-${String(values.day).padStart(2, '0')}`;
            onSubmit({
                id: expense?.id,
                category: values.category,
                location: values.location,
                amount: cleanedAmount,
                formattedDate,
                payment: values.payment,
                deduction: values.deduction
            });
        }
    });

    const daysInMonth = getDaysInMonth(formik.values.month);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div ref={ref} tabIndex={-1}>
            <MainCard
                sx={{
                    position: 'absolute',
                    width: {
                        xs: 280,
                        sm: 500,
                        lg: 650
                    },
                    maxHeight: '80vh', // Limits the modal height to 80% of the viewport height
                    overflowY: 'auto', // Enables scrolling if content overflows
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                title="Edit Expense"
                content={false}
                secondary={
                    <IconButton onClick={handleClose} size="large" aria-label="close modal">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <form onSubmit={formik.handleSubmit}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12}>
                                <InputLabel>Category</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder=" "
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    error={formik.touched.category && Boolean(formik.errors.category)}
                                    helperText={formik.touched.category && formik.errors.category}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Location</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder=" "
                                    name="location"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    error={formik.touched.location && Boolean(formik.errors.location)}
                                    helperText={formik.touched.location && formik.errors.location}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Amount</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder="0.00"
                                    name="amount"
                                    value={formik.values.amount}
                                    onChange={(event) => {
                                        let rawValue = event.target.value.replace(/\D/g, ''); // Remove non-digits
                                        if (!rawValue) rawValue = '0'; // Ensure fallback value

                                        let numberValue = parseFloat(rawValue) / 100; // Convert to float
                                        let formattedValue = numberValue.toLocaleString('en-US', {
                                            style: 'decimal',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        });

                                        formik.setFieldValue('amount', formattedValue);
                                    }}
                                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                                    helperText={formik.touched.amount && formik.errors.amount}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Date</InputLabel>
                                <Grid container spacing={1}>
                                    {/* Month */}
                                    <Grid item xs={4}>
                                        <FormControl fullWidth error={formik.touched.month && Boolean(formik.errors.month)}>
                                            <Select
                                                name="month"
                                                value={formik.values.month}
                                                onChange={(e) => {
                                                    const newMonth = Number(e.target.value);
                                                    formik.setFieldValue('month', newMonth);

                                                    const maxDays = getDaysInMonth(newMonth);

                                                    if (formik.values.day && Number(formik.values.day) > maxDays) {
                                                        formik.setFieldValue('day', '');
                                                    }
                                                }}
                                                displayEmpty
                                            >
                                                <MenuItem value="">Month</MenuItem>

                                                {months.map((month) => (
                                                    <MenuItem key={month.value} value={month.value}>
                                                        {month.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>

                                            {formik.touched.month && formik.errors.month && (
                                                <FormHelperText>{formik.errors.month}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    {/* Day */}
                                    <Grid item xs={4}>
                                        <FormControl fullWidth error={formik.touched.day && Boolean(formik.errors.day)}>
                                            <Select name="day" value={formik.values.day} onChange={formik.handleChange} displayEmpty>
                                                <MenuItem value="">Day</MenuItem>

                                                {days.map((day) => (
                                                    <MenuItem key={day} value={day}>
                                                        {day}
                                                    </MenuItem>
                                                ))}
                                            </Select>

                                            {formik.touched.day && formik.errors.day && (
                                                <FormHelperText>{formik.errors.day}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    {/* Year */}
                                    <Grid item xs={4}>
                                        <FormControl fullWidth error={formik.touched.year && Boolean(formik.errors.year)}>
                                            <Select name="year" value={formik.values.year} onChange={formik.handleChange} displayEmpty>
                                                <MenuItem value="">Year</MenuItem>

                                                {years.map((year) => (
                                                    <MenuItem key={year} value={year}>
                                                        {year}
                                                    </MenuItem>
                                                ))}
                                            </Select>

                                            {formik.touched.year && formik.errors.year && (
                                                <FormHelperText>{formik.errors.year}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Payment Type</InputLabel>
                                <Select fullWidth name="payment" value={formik.values.payment} onChange={formik.handleChange}>
                                    <MenuItem value={PAYMENT_TYPE.CREDIT}>Credit</MenuItem>
                                    <MenuItem value={PAYMENT_TYPE.DEBIT}>Debit</MenuItem>
                                    <MenuItem value={PAYMENT_TYPE.CASH}>Cash</MenuItem>
                                </Select>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <InputLabel id="deduct-budget-label">Deduct from Budget</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="deduct-budget-label"
                                    id="deduction"
                                    name="deduction"
                                    value={formik.values.deduction}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value={DEDUCT_BUDGET.NONE}>None</MenuItem>
                                </Select>
                            </Grid> */}
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Button type="submit" variant="contained" color="secondary">
                                    Save
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={formik.handleReset}>
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </form>
            </MainCard>
        </div>
    );
});

Body.propTypes = {
    modalStyle: PropTypes.object,
    handleClose: PropTypes.func,
    onSubmit: PropTypes.func,
    expense: PropTypes.object
};

// ==============================|| SIMPLE MODAL ||============================== //

export default function ExpensesEditModal({ open, handleClose, onUpdate, expense }) {
    const [modalStyle] = React.useState(getModalStyle);

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            <Body
                modalStyle={modalStyle}
                handleClose={handleClose}
                onSubmit={(updatedExpense) => {
                    onUpdate(updatedExpense); // Use onUpdate here (which is handleExpenseUpdate)
                    handleClose();
                }}
                expense={expense}
            />
        </Modal>
    );
}

ExpensesEditModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    expense: PropTypes.object
};
