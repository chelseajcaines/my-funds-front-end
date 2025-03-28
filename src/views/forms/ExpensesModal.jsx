import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'store';
import { useFormik } from 'formik';
import { format } from 'date-fns';

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

const DEDUCT_BUDGET = {
    NONE: 'None'
};

const validationSchema = yup.object({
    category: yup.string().required('Category is required.'),
    location: yup.string().required('Location is required.'),
    amount: yup
        .number()
        .typeError('Amount must be a number.')
        .positive('Amount must be a positive number.')
        .required('Purchase Amount is required.'),
    date: yup.date().typeError('Date is required.').required('Date is required.'),
    payment: yup
        .string()
        .oneOf([PAYMENT_TYPE.CREDIT, PAYMENT_TYPE.DEBIT, PAYMENT_TYPE.CASH], 'Invalid selection for Payment Type.')
        .required('Payment Type selection is required.'),
    deduct: yup.string().oneOf([DEDUCT_BUDGET.NONE], 'Invalid selection for Deduct from Budget.').required('Please choose a budget or None')
});

const Body = React.forwardRef(({ modalStyle, handleClose, onSubmit }, ref) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            category: '',
            location: '',
            amount: '',
            date: null,
            payment: PAYMENT_TYPE.DEBIT,
            deduct: DEDUCT_BUDGET.NONE
        },
        validationSchema,
        onSubmit: (values) => {
            onSubmit(values.category, values.location, values.amount, values.date, values.payment, values.deduct);
        }
    });

    return (
        <div ref={ref} tabIndex={-1}>
            <MainCard
                sx={{
                    position: 'absolute',
                    width: { xs: 280, lg: 650 },
                    maxHeight: '80vh', // Limits the modal height to 80% of the viewport height
                    overflowY: 'auto', // Enables scrolling if content overflows
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                title="New Expense"
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
                                    helpertext={formik.touched.category && formik.errors.category}
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
                                    helpertext={formik.touched.location && formik.errors.location}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Amount</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder=" "
                                    name="amount"
                                    value={formik.values.amount}
                                    onChange={formik.handleChange}
                                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                                    helpertext={formik.touched.amount && formik.errors.amount}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Date</InputLabel>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        // value={formik.values.date}
                                        value={formik.values.date ? new Date(formik.values.date) : null} // Convert string to Date for the DatePicker
                                        onChange={(newValue) => {
                                            const formattedDate = newValue ? format(newValue, 'yyyy-MM-dd') : ''; // Format the Date object to a string
                                            formik.setFieldValue('date', formattedDate); // Set the formatted string in formik
                                        }}
                                        // onChange={(newValue) => formik.setFieldValue('date', newValue)}
                                        slotProps={{ textField: { fullWidth: true } }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                name="date"
                                                placeholder="Select Date"
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton position="end">
                                                            <CalendarTodayIcon />
                                                        </IconButton>
                                                    )
                                                }}
                                                error={formik.touched.date && Boolean(formik.errors.date)}
                                                helpertext={formik.touched.date && formik.errors.date}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Payment Type</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="payment-type"
                                    id="payment"
                                    name="payment"
                                    value={formik.values.payment}
                                    onChange={formik.handleChange}
                                    error={formik.touched.payment && Boolean(formik.errors.payment)}
                                    helpertext={formik.touched.payment && formik.errors.payment}
                                >
                                    <MenuItem value={PAYMENT_TYPE.CREDIT}>Credit</MenuItem>
                                    <MenuItem value={PAYMENT_TYPE.DEBIT}>Debit</MenuItem>
                                    <MenuItem value={PAYMENT_TYPE.CASH}>Cash</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Deduct from Budget</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="deduct-budget"
                                    id="deduct"
                                    name="deduct"
                                    value={formik.values.deduct}
                                    onChange={formik.handleChange}
                                    error={formik.touched.deduct && Boolean(formik.errors.deduct)}
                                    helpertext={formik.touched.deduct && formik.errors.deduct}
                                >
                                    <MenuItem value={DEDUCT_BUDGET.NONE}>None</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Button type="submit" variant="contained" color="secondary">
                                    Submit
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
    onSubmit: PropTypes.func.isRequired
};

// ==============================|| SIMPLE MODAL ||============================== //

export default function ExpensesModal({ onSubmit }) {
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container justifyContent="flex-end">
            <Tooltip title="Add Expense" placement="left">
                <Fab size="small" color="primary" aria-label="new todo add" onClick={handleOpen}>
                    <AddRoundedIcon fontSize="small" onClick={handleOpen} />
                </Fab>
            </Tooltip>

            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Body
                    modalStyle={modalStyle}
                    handleClose={handleClose}
                    onSubmit={(category, location, amount, date, payment, deduct) => {
                        onSubmit(category, location, amount, date, payment, deduct);
                        handleClose();
                    }}
                />
            </Modal>
        </Grid>
    );
}

ExpensesModal.propTypes = {
    onSubmit: PropTypes.func.isRequired
};
