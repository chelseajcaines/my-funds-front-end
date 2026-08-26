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

const TIME_SPANS = {
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly',
    YEARLY: 'Yearly'
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

const validationSchema = yup.object({
    name: yup.string().required('Name is required.'),
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
    time: yup
        .string()
        .oneOf([TIME_SPANS.WEEKLY, TIME_SPANS.MONTHLY, TIME_SPANS.YEARLY], 'Invalid selection for Time Span.')
        .required('Time Span selection is required.'),
    month: yup.number().required('Month is required.'),
    day: yup.number().required('Day is required.'),
    year: yup.number().required('Year is required.')
    // date: yup.date().typeError('Date is required.').required('Start Date is required.')
});

const Body = React.forwardRef(({ modalStyle, handleClose, onSubmit, budgets }, ref) => {
    const dispatch = useDispatch();

    const budgetDate = budgets?.date ? String(budgets.date).slice(0, 10).split('-') : [];

    const budgetYear = budgetDate.length === 3 ? Number(budgetDate[0]) : '';

    const budgetMonth = budgetDate.length === 3 ? Number(budgetDate[1]) : '';

    const budgetDay = budgetDate.length === 3 ? Number(budgetDate[2]) : '';

    const formik = useFormik({
        initialValues: {
            name: budgets?.name || '',
            amount: budgets?.amount
                ? Number(budgets.amount).toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                  })
                : '',
            time: budgets?.time || TIME_SPANS.WEEKLY, // Set to a default valid value
            month: budgetMonth,
            day: budgetDay,
            year: budgetYear
            // date: budgets?.date || ''
        },
        enableReinitialize: true,

        validationSchema,
        onSubmit: (values) => {
            const cleanedAmount = parseFloat(values.amount.replace(/,/g, ''));
            const formattedDate = `${values.year}-${String(values.month).padStart(2, '0')}-${String(values.day).padStart(2, '0')}`;
            onSubmit(values.name, cleanedAmount, values.time, formattedDate);
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
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                title="Edit Budget"
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
                                <InputLabel>Name</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder=" "
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Max Amount</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder="0.00"
                                    name="amount"
                                    value={formik.values.amount}
                                    onChange={(event) => {
                                        let rawValue = event.target.value.replace(/\D/g, ''); // Remove non-digits
                                        if (!rawValue) rawValue = '0'; // Ensure at least "0"

                                        const numberValue = parseFloat(rawValue) / 100;
                                        const formattedValue = numberValue.toLocaleString('en-US', {
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
                                <InputLabel>Time Span</InputLabel>
                                <FormControl fullWidth error={formik.touched.time && Boolean(formik.errors.time)}>
                                    <Select
                                        labelId="time-select"
                                        id="time"
                                        name="time"
                                        value={formik.values.time}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={TIME_SPANS.WEEKLY}>Weekly</MenuItem>
                                        <MenuItem value={TIME_SPANS.MONTHLY}>Monthly</MenuItem>
                                        <MenuItem value={TIME_SPANS.YEARLY}>Yearly</MenuItem>
                                    </Select>
                                    {formik.touched.time && formik.errors.time && <FormHelperText>{formik.errors.time}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel>Start Date</InputLabel>

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
    onSubmit: PropTypes.func.isRequired,
    budgets: PropTypes.object
};

// ==============================|| SIMPLE MODAL ||============================== //

export default function SimpleEditModal({ open, handleClose, onSubmit, budget }) {
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            <Body
                modalStyle={modalStyle}
                handleClose={handleClose}
                onSubmit={(name, amount, time, date) => {
                    onSubmit({
                        name,
                        amount,
                        time,
                        date
                    });
                    handleClose();
                }}
                budgets={budget}
            />
        </Modal>
    );
}

SimpleEditModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    budget: PropTypes.object
};
