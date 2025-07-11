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
    date: yup.date().typeError('Date is required.').required('Start Date is required.')
});

const Body = React.forwardRef(({ modalStyle, handleClose, onSubmit }, ref) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            amount: '',
            time: TIME_SPANS.WEEKLY, // Set to a default valid value
            date: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const cleanedAmount = parseFloat(values.amount.replace(/,/g, ''));
            onSubmit(values.name, cleanedAmount, values.time, values.date);
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
                title="New Budget"
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
                                        let rawValue = event.target.value.replace(/\D/g, '');
                                        if (!rawValue) rawValue = '0';

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
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={formik.values.date ? new Date(formik.values.date + 'T00:00:00') : null}
                                        onChange={(newValue) => {
                                            if (newValue) {
                                                // Format to a local date string for DB storage (YYYY-MM-DD)
                                                const formattedDate = format(newValue, 'yyyy-MM-dd');
                                                formik.setFieldValue('date', formattedDate);
                                            } else {
                                                formik.setFieldValue('date', '');
                                            }
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                name: 'date',
                                                placeholder: 'Select Date',
                                                error: formik.touched.date && Boolean(formik.errors.date),
                                                helperText: formik.touched.date && formik.errors.date
                                            }
                                        }}
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

export default function SimpleModal({ onSubmit }) {
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
            <Tooltip title="Add Budget" placement="left">
                <Fab size="small" color="primary" aria-label="new todo add" onClick={handleOpen}>
                    <AddRoundedIcon fontSize="small" onClick={handleOpen} />
                </Fab>
            </Tooltip>

            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Body
                    modalStyle={modalStyle}
                    handleClose={handleClose}
                    onSubmit={(name, amount, time, date) => {
                        onSubmit(name, amount, time, date);
                        handleClose();
                    }}
                />
            </Modal>
        </Grid>
    );
}

SimpleModal.propTypes = {
    onSubmit: PropTypes.func.isRequired
};
