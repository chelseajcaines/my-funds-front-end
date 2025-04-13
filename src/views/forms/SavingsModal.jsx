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

const DEPOSIT_FREQUENCY = {
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    BIWEEKLY: 'Bi-Weekly',
    MONTHLY: 'Monthly',
    YEARLY: 'Yearly'
};

const validationSchema = yup.object({
    name: yup.string().required('Name is required.'),
    amount: yup
        .number()
        .typeError('Amount must be a number.')
        .positive('Amount must be a positive number.')
        .required('Max Amount is required.'),
    deposit_amount: yup
        .number()
        .typeError('Amount must be a number.')
        .positive('Amount must be a positive number.')
        .required('Deposit Amount is required.'),
    time: yup
        .string()
        .oneOf(
            [
                DEPOSIT_FREQUENCY.DAILY,
                DEPOSIT_FREQUENCY.WEEKLY,
                DEPOSIT_FREQUENCY.BIWEEKLY,
                DEPOSIT_FREQUENCY.MONTHLY,
                DEPOSIT_FREQUENCY.YEARLY
            ],
            'Invalid selection for Time Span.'
        )
        .required('Time Span selection is required.'),
    date: yup.date().typeError('Date is required.').required('Start Date is required.')
});

const Body = React.forwardRef(({ modalStyle, handleClose, onSubmit }, ref) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            amount: '',
            deposit_amount: '',
            time: DEPOSIT_FREQUENCY.DAILY, // Set to a default valid value
            date: null
        },
        validationSchema,
        onSubmit: (values) => {
            onSubmit(values.name, values.amount, values.deposit_amount, values.time, values.date);
        }
    });

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
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                title="New Savings Goal"
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
                                <InputLabel>Title</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder=" "
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helpertext={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Goal Amount</InputLabel>
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
                                <InputLabel>Ideal Deposit Amount</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder=" "
                                    name="deposit_amount"
                                    value={formik.values.deposit_amount}
                                    onChange={formik.handleChange}
                                    error={formik.touched.deposit_amount && Boolean(formik.errors.deposit_amount)}
                                    helpertext={formik.touched.deposit_amount && formik.errors.deposit_amount}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Deposit Frequency</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="time-select"
                                    id="time"
                                    name="time"
                                    value={formik.values.time}
                                    onChange={formik.handleChange}
                                    error={formik.touched.time && Boolean(formik.errors.time)}
                                    helpertext={formik.touched.time && formik.errors.time}
                                >
                                    <MenuItem value={DEPOSIT_FREQUENCY.DAILY}>Daily</MenuItem>
                                    <MenuItem value={DEPOSIT_FREQUENCY.WEEKLY}>Weekly</MenuItem>
                                    <MenuItem value={DEPOSIT_FREQUENCY.BIWEEKLY}>Bi-Weekly</MenuItem>
                                    <MenuItem value={DEPOSIT_FREQUENCY.MONTHLY}>Monthly</MenuItem>
                                    <MenuItem value={DEPOSIT_FREQUENCY.YEARLY}>Yearly</MenuItem>
                                </Select>
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel>Start Date</InputLabel>
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

export default function SavingsModal({ onSubmit }) {
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
            <Tooltip title="Add Savings Goal" placement="left">
                <Fab size="small" color="primary" aria-label="new todo add" onClick={handleOpen}>
                    <AddRoundedIcon fontSize="small" onClick={handleOpen} />
                </Fab>
            </Tooltip>

            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Body
                    modalStyle={modalStyle}
                    handleClose={handleClose}
                    onSubmit={(name, amount, deposit_amount, time, date) => {
                        onSubmit(name, amount, deposit_amount, time, date);
                        handleClose();
                    }}
                />
            </Modal>
        </Grid>
    );
}

SavingsModal.propTypes = {
    onSubmit: PropTypes.func.isRequired
};
