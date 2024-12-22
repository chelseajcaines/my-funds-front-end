import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'store';
import { useFormik } from 'formik';

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
    BIWEEKLY: 'Bi-Weekly',
    MONTHLY: 'Monthly',
    YEARLY: 'Yearly'
};

const POSITION_TYPES = {
    FULLTIME: 'Full Time',
    PARTTIME: 'Part Time',
    CASUAL: 'Casual',
    SIDEJOB: 'Side Job'
};

const validationSchema = yup.object({
    name: yup.string().required('Name is required.'),
    amount: yup
        .number()
        .typeError('Amount must be a number.')
        .positive('Amount must be a positive number.')
        .required('Max Amount is required.'),
    time: yup
        .string()
        .oneOf([TIME_SPANS.WEEKLY, TIME_SPANS.BIWEEKLY, TIME_SPANS.MONTHLY, TIME_SPANS.YEARLY], 'Invalid selection for Time Span.')
        .required('Time Span selection is required.'),
    date: yup.date().typeError('Date is required.').required('Start Date is required.'),
    position: yup
        .string()
        .oneOf(
            [POSITION_TYPES.FULLTIME, POSITION_TYPES.PARTTIME, POSITION_TYPES.CASUAL, POSITION_TYPES.SIDEJOB],
            'Invalid selection for Position Type.'
        )
        .required('Position Types selection is required.')
});

const Body = React.forwardRef(({ modalStyle, handleClose }, ref) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            amount: '',
            time: TIME_SPANS.BIWEEKLY, // Set to a default valid value
            date: null,
            position: POSITION_TYPES.FULLTIME
        },
        validationSchema,
        onSubmit: () => {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Select - Submit Success',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        }
    });

    return (
        <div ref={ref} tabIndex={-1}>
            <MainCard
                sx={{
                    position: 'absolute',
                    width: { xs: 280, lg: 650 },
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                title="New Income"
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
                                <InputLabel>Company</InputLabel>
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
                                <InputLabel>Salary</InputLabel>
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
                                <InputLabel>Pay Period</InputLabel>
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
                                    <MenuItem value={TIME_SPANS.WEEKLY}>Weekly</MenuItem>
                                    <MenuItem value={TIME_SPANS.BIWEEKLY}>Bi-Weekly</MenuItem>
                                    <MenuItem value={TIME_SPANS.MONTHLY}>Monthly</MenuItem>
                                    <MenuItem value={TIME_SPANS.YEARLY}>Yearly</MenuItem>
                                </Select>
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel>Start Date</InputLabel>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={formik.values.date}
                                        onChange={(newValue) => formik.setFieldValue('date', newValue)}
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
                                <InputLabel>Contract Type</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="contract-select"
                                    id="position"
                                    name="position"
                                    value={formik.values.position}
                                    onChange={formik.handleChange}
                                    error={formik.touched.position && Boolean(formik.errors.position)}
                                    helpertext={formik.touched.position && formik.errors.position}
                                >
                                    <MenuItem value={POSITION_TYPES.FULLTIME}>Full Time</MenuItem>
                                    <MenuItem value={POSITION_TYPES.PARTTIME}>Part Time</MenuItem>
                                    <MenuItem value={POSITION_TYPES.CASUAL}>Casual</MenuItem>
                                    <MenuItem value={POSITION_TYPES.SIDEJOB}>Side Job</MenuItem>
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
    handleClose: PropTypes.func
};

// ==============================|| SIMPLE MODAL ||============================== //

export default function SimpleModal() {
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
                <Body modalStyle={modalStyle} handleClose={handleClose} />
            </Modal>
        </Grid>
    );
}